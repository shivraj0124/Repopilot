import prisma from "../config/prisma";

export const saveRepository = async (
  userId: number,
  owner: string,
  repoName: string,
  repoUrl: string
) => {
  const existing = await prisma.repository.findFirst({
    where: {
      userId,
      repoUrl,
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.repository.create({
    data: {
      userId,
      owner,
      repoName,
      repoUrl,
    },
  });
};

export const saveAnalysis = async (
  repositoryId: number,
  analysis: any
) => {
  return prisma.analysis.create({
    data: {
      repositoryId,
      summary: analysis.projectPurpose,
      architecture: analysis.architecture.pattern,
      techStack: analysis.techStack.join(", "),
      folderExplanation: analysis.folderExplanation,
    },
  });
};

export const getAnalysisHistory = async (userId: number) => {
  return prisma.analysis.findMany({
    where: {
      repository: {
        userId,
      },
    },
    include: {
      repository: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};