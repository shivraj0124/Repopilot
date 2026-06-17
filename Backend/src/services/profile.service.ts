import prisma from "../config/prisma";

export const getProfileStats = async (
  userId: number
) => {
  const repositoriesAnalyzed =
    await prisma.repository.count({
      where: {
        userId,
      },
    });

  const issuesAnalyzed =
    await prisma.issueAnalysis.count({
      where: {
        repository: {
          userId,
        },
      },
    });

  return {
    repositoriesAnalyzed,
    issuesAnalyzed,
  };
};