import { AsyncLocalStorage } from "node:async_hooks"
import { mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { sqliteSchema, postgresSchema } from "./schema"

export type Row = Record<string, string | number | bigint | boolean | null>
export interface Database {
  dialect: "sqlite" | "postgres"
  isTransaction: boolean
  prepare(sql: string): {
    get(...values: unknown[]): Promise<Row | undefined>
    all(...values: unknown[]): Promise<Row[]>
    run(...values: unknown[]): Promise<void>
  }
  exec(sql: string): Promise<void>
  close(): Promise<void>
}
export interface PoolConnection extends QueryClient { release(): void }
export interface DatabasePool { connect(): Promise<PoolConnection> }
export interface QueryClient {
  query(sql: string, values?: unknown[]): Promise<{ rows: Row[] }>
}

export class DatabaseConfigurationError extends Error {
  constructor() { super("O banco de dados do site ainda não está configurado. Ative o Netlify Database e faça um novo deploy.") }
}

const scope = new AsyncLocalStorage<Database>()
const state = globalThis as unknown as {
  ecolearnLocal?: Promise<Database>
  ecolearnPool?: Promise<DatabasePool>
  ecolearnQueue?: Promise<void>
}

export function postgresSql(sql: string) {
  let index = 0
  return sql.replace(/\?/g, () => "$" + (++index))
    .replace(/\bMAX\(/g, "GREATEST(")
    .replace(/^INSERT OR IGNORE /, "INSERT ")
    + (sql.startsWith("INSERT OR IGNORE ") ? " ON CONFLICT DO NOTHING" : "")
}

export function createPostgresDatabase(client: QueryClient): Database {
  let inTransaction = false
  return {
    dialect: "postgres",
    get isTransaction() { return inTransaction },
    prepare(sql) {
      const query = postgresSql(sql)
      return {
        async get(...values) { return (await client.query(query, values)).rows[0] },
        async all(...values) { return (await client.query(query, values)).rows },
        async run(...values) { await client.query(query, values) },
      }
    },
    async exec(sql) {
      const query = sql === "BEGIN IMMEDIATE" ? "BEGIN" : sql
      await client.query(query)
      if (query === "BEGIN") inTransaction = true
      if (query === "COMMIT" || query === "ROLLBACK") inTransaction = false
    },
    async close() {},
  }
}

async function localDatabase(): Promise<Database> {
  const { DatabaseSync } = await import("node:sqlite")
  const filename = resolve(/* turbopackIgnore: true */ process.env.ECOLEARN_DB_PATH || "data/ecolearn.sqlite")
  mkdirSync(dirname(filename), { recursive: true })
  const connection = new DatabaseSync(filename)
  connection.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;")
  connection.exec(sqliteSchema)
  return {
    dialect: "sqlite",
    get isTransaction() { return connection.isTransaction },
    prepare(sql) {
      const statement = connection.prepare(sql)
      return {
        async get(...values) { return statement.get(...values as import("node:sqlite").SQLInputValue[]) as Row | undefined },
        async all(...values) { return statement.all(...values as import("node:sqlite").SQLInputValue[]) as Row[] },
        async run(...values) { statement.run(...values as import("node:sqlite").SQLInputValue[]) },
      }
    },
    async exec(sql) { connection.exec(sql) },
    async close() { connection.close(); state.ecolearnLocal = undefined },
  }
}

export function usesPostgres() {
  return Boolean(process.env.DATABASE_URL || process.env.NETLIFY_DB_URL || process.env.NETLIFY === "true" || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.ECOLEARN_DATABASE === "postgres")
}

async function postgresPool() {
  if (!state.ecolearnPool) {
    state.ecolearnPool = (async () => {
      let pool: DatabasePool
      if (process.env.DATABASE_URL) {
        const { Pool } = await import("pg")
        pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 4, connectionTimeoutMillis: 10000, idleTimeoutMillis: 10000 })
      } else {
        const { getDatabase } = await import("@netlify/database")
        try { pool = getDatabase().pool }
        catch (error) {
          if (error instanceof Error && error.name === "MissingDatabaseConnectionError") throw new DatabaseConfigurationError()
          throw error
        }
      }
      // Serialize first-time DDL across cold starts. Existing rows are untouched.
      const client = await pool.connect()
      try {
        await client.query("BEGIN")
        await client.query("SELECT pg_advisory_xact_lock(702093641)")
        await client.query(postgresSchema)
        await client.query("COMMIT")
      } catch (error) {
        await client.query("ROLLBACK")
        throw error
      } finally { client.release() }
      return pool
    })().catch((error) => { state.ecolearnPool = undefined; throw error })
  }
  return state.ecolearnPool
}

export async function db(): Promise<Database> {
  const active = scope.getStore()
  if (active) return active
  if (usesPostgres()) throw new Error("PostgreSQL requires a request-scoped connection.")
  state.ecolearnLocal ??= localDatabase().catch((error) => { state.ecolearnLocal = undefined; throw error })
  return state.ecolearnLocal
}

export function runWithDatabase<T>(database: Database, operation: () => Promise<T>): Promise<T> {
  return scope.run(database, operation)
}

export async function withDatabase<T>(operation: () => Promise<T>): Promise<T> {
  if (scope.getStore()) return operation()
  if (usesPostgres()) {
    const client = await (await postgresPool()).connect()
    const database = createPostgresDatabase(client)
    try { return await runWithDatabase(database, operation) }
    finally {
      if (database.isTransaction) await database.exec("ROLLBACK")
      client.release()
    }
  }
  // A local SQLite connection must not interleave async requests inside a transaction.
  const previous = state.ecolearnQueue ?? Promise.resolve()
  let release!: () => void
  state.ecolearnQueue = new Promise<void>((resolve) => { release = resolve })
  await previous
  try { return await runWithDatabase(await db(), operation) }
  finally { release() }
}
