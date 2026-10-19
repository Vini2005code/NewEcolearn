# Ecolearn

Plataforma de educação ambiental com Next.js, React, TypeScript e persistência em SQLite local ou PostgreSQL no Netlify. As telas e os arquivos de mídia existentes foram mantidos; os módulos demonstrativos agora usam dados persistentes.

## Executar

Requer Node.js 22.13 ou superior (validado com Node 24) e pnpm.

~~~sh
pnpm install
pnpm dev
~~~

Abra http://localhost:3000. O banco é criado automaticamente em data/ecolearn.sqlite. A variável opcional ECOLEARN_DB_PATH muda o caminho; veja .env.example. Em produção, use caminho absoluto em um disco persistente.

~~~sh
pnpm build
pnpm start
~~~

## Funcionalidades

- Quatro quizzes: Sustentabilidade, Biodiversidade, Dengue e Saúde Alimentar no Agronegócio.
- Saúde Alimentar tem as sete questões fornecidas, três alternativas por questão e gabarito B, B, A, C, B, B, A. Acertar todas vale 175 XP.
- O servidor calcula acertos, nota e XP. Uma tentativa reenviada retorna o mesmo resultado sem duplicar XP. Há revisão completa das respostas ao final.
- Tempo opcional de 30 segundos por questão, feedback imediato e reinício independente ao trocar de trilha.
- Perfil de visitante persistente, histórico das últimas 20 tentativas e importação única dos totais antigos do localStorage. As chaves antigas continuam intactas.
- Três cursos com três leituras cada, conclusão persistente, retomada da primeira leitura pendente e vídeo original da ONU.
- Ranking com as 20 jornadas com mais XP, publicações na comunidade, criação de campanhas, participação sem duplicação e indicadores coletivos calculados a partir do banco.
- Conquistas e níveis refletem a atividade real. Pausar a jornada não apaga o progresso.

## Identificação e dados

Não há conta ou senha: uma chave aleatória em cookie HttpOnly identifica a jornada deste navegador. O banco guarda apenas o hash dessa chave. Os dados permanecem no servidor, mas limpar o cookie ou usar outro navegador inicia uma nova jornada. Não há sincronização entre dispositivos nem recuperação de conta.

A importação dos totais antigos é uma compatibilidade com o protótipo; esses valores eram controlados pelo navegador e não podem ser verificados retroativamente. Apenas quizzes concluídos depois da migração aparecem no histórico detalhado e nos indicadores coletivos de tentativas.

Ideias e campanhas são públicas aos visitantes desta instância. Nenhum nome, email ou identificador de sessão é exposto no ranking. A API valida entradas, usa consultas parametrizadas, limita o tamanho das requisições, rejeita escritas de outra origem e limita a frequência de novas tentativas e publicações. O cronômetro é uma ajuda de estudo no cliente, não um mecanismo de fiscalização. A geração de quizzes por IA continua planejada, sem integração externa ativa; patrocínios comerciais e QR Codes não foram ativados.

## API

Todas as respostas de dados usam Cache-Control: no-store.

| Método | Caminho | Função |
| --- | --- | --- |
| GET | /api/profile | Recuperar ou criar a jornada |
| POST | /api/progress/migrate | Importar totais antigos uma única vez |
| POST | /api/quizzes/start | Criar uma tentativa e receber as perguntas |
| POST | /api/quizzes/submit | Corrigir respostas e salvar resultado |
| GET | /api/history | Consultar últimas tentativas |
| POST | /api/courses/complete | Registrar leitura concluída |
| GET | /api/hub | Ranking, comunidade, campanhas e indicadores |
| POST | /api/community | Publicar ideia |
| POST | /api/campaigns | Criar campanha |
| POST | /api/campaigns/join | Registrar participação |

Escritas aceitam JSON. Campos inválidos retornam 400, origem indevida 403, recursos ausentes 404, corpo grande 413, formato incorreto 415 e frequência excedida 429. Erros internos não expõem detalhes do banco.

## Verificar

~~~sh
pnpm typecheck
pnpm test
pnpm build
pnpm test:http
~~~

Os testes de serviço usam banco temporário e validam isolamento de visitantes, migração, as quatro trilhas, gabarito de Saúde Alimentar, idempotência, respostas inválidas, leituras, comunidade, campanhas, arquivos de imagem e persistência em outro processo. Os testes PostgreSQL usam PGlite (PostgreSQL em WASM) para executar a mesma migração e os serviços, sem credenciais nem acesso à produção. Os testes HTTP iniciam o build de produção em 127.0.0.1:3107 com outro banco temporário e verificam cookies, pontuação, reenvios e erros da API. A porta 3107 precisa estar livre. pnpm lint executa a verificação de tipos; o projeto não tem ESLint configurado.

## Hospedagem e backup

Localmente, o backend continua usando SQLite em data/ecolearn.sqlite, sem alterar os dados já existentes. No Netlify, usa PostgreSQL com o driver oficial @netlify/database; nenhuma gravação persistente é feita no disco das funções. Também aceita DATABASE_URL para outro provedor PostgreSQL. Não use exportação estática: as rotas /api precisam de servidor.

### Publicar no Netlify

1. Publique as alterações deste projeto no repositório conectado ao site e execute um novo deploy. O netlify.toml define pnpm build, .next e Node 24.
2. Mantenha netlify/database/migrations/0001_ecolearn.sql no repositório. O Netlify Database provisiona o banco e aplica as migrações no ciclo de deploy, conforme a [documentação oficial](https://docs.netlify.com/build/data-and-storage/netlify-database/getting-started/).
3. Se a conta solicitar configuração manual, abra Data & Storage > Database no projeto e use Create a database manually; depois faça um novo deploy.
4. Se houver um banco externo, configure DATABASE_URL como variável secreta disponível às Functions e faça novo deploy. Nesse caso, as tabelas são criadas automaticamente na primeira conexão, sem remover registros existentes.
5. Valide /api/profile: deve retornar 200. Confira um quiz, o histórico e a persistência após recarregar. Se aparecer erro, consulte os logs da função Next.js no Netlify.

Não configure ECOLEARN_DB_PATH como solução para o Netlify e não aponte o banco para /tmp: esse disco não garante persistência. As tabelas usam criação aditiva; o backend não apaga dados durante inicialização. O SQLite local e o PostgreSQL hospedado são bancos distintos; dados locais não são copiados automaticamente para a nuvem. O design e o conteúdo dos quizzes permanecem iguais.

Faça backup do banco com o servidor parado, ou use a API de backup do SQLite para uma cópia consistente. Não remova data/ durante atualizações. O banco local e os arquivos WAL/SHM são ignorados pelo Git. Para PostgreSQL, use os recursos de backup do provedor. A publicação pública de comunidade e campanhas requer operação de moderação e controle de acesso apropriado ao público; a versão atual identifica visitantes por navegador.

## Projeto de origem

O projeto original foi criado com v0. Referência preservada: [projeto no v0](https://v0.app/chat/projects/prj_hLdtZf0fAOIvLY5n68Dl67YLKnke). Nenhum deploy, push ou alteração de hospedagem foi executado nesta implementação.
