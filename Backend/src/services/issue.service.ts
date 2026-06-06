import prisma from "../config/prisma";

export const saveIssueAnalysis = async (
  repositoryId: number,
  issueNumber: number,
  issueTitle: string,
  analysis: any
) => {
  return prisma.issueAnalysis.create({
    data: {
      repositoryId,
      issueNumber,
      issueTitle,

      problem: analysis.problem,
      rootCause: analysis.rootCause,

      difficulty: analysis.difficulty,
      estimatedTime: analysis.estimatedTime,

      roadmap: JSON.stringify(analysis.roadmap),
    },
  });
};

export const getIssueAnalysisHistory = async (
  userId: number
) => {
  return prisma.issueAnalysis.findMany({
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