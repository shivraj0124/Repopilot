import { Request, Response } from "express";
import { extractRepoInfo } from "../utils/github";
import { getCache, setCache } from "../services/cache.service";
import {
  getRepository,
  getReadme,
  getRepoTree,
} from "../services/github.service";

import { generateRepositorySummary } from "../services/gemini.service";

import { saveRepository, saveAnalysis } from "../services/repository.service";

import { getAnalysisHistory } from "../services/repository.service";
export const analyzeRepository = async (req: any, res: Response) => {
  try {
    const { repoUrl } = req.body;

    const { owner, repo } = extractRepoInfo(repoUrl);
    const cacheKey = `repository:${owner}:${repo}`;

    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        cached: true,
        ...cachedData,
      });
    }
    const repository = await getRepository(owner, repo);

    const readme = await getReadme(owner, repo);

    const tree = await getRepoTree(owner, repo);

    const aiAnalysis = await generateRepositorySummary(readme, tree);
    console.log("aiAnalysis", aiAnalysis);

    const repositoryRecord = await saveRepository(
      req.user.userId,
      owner,
      repo,
      repoUrl,
    );

    const analysisRecord = await saveAnalysis(repositoryRecord.id, aiAnalysis);
    const responseData = {
      repository: repositoryRecord,
      analysis: analysisRecord,
      aiAnalysis,
      tree,
    };
    await setCache(cacheKey, responseData);
    res.status(200).json({
      success: true,cached: false,
      repository: repositoryRecord,
      analysis: analysisRecord,
      aiAnalysis,
      tree,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHistory = async (req: any, res: Response) => {
  try {
    const analyses = await getAnalysisHistory(req.user.userId);

    res.status(200).json({
      success: true,
      analyses,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
