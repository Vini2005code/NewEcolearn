export const aiQuizGeneration = {
  enabledForUsers: false,
  adminOnly: true,
  status: "planned" as const,
}

export function assertAdminQuizGeneration(isAdmin: boolean) {
  if (!aiQuizGeneration.enabledForUsers && !isAdmin) {
    throw new Error("AI quiz generation is reserved for admins and is not active in the MVP.")
  }
}
