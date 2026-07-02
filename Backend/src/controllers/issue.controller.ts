import { Request, Response } from "express";
import { getCache, setCache } from "../services/cache.service";
import { extractRepoInfo } from "../utils/github";
import {
  getIssue,
  getRepositoryIssues,
  getTrendingIssues,
  getGoodFirstIssues,
  searchIssues,
} from "../services/github.service";
import { analyzeIssue } from "../services/gemini.service";
import { saveIssueAnalysis } from "../services/issue.service";
import prisma from "../config/prisma";
import { getIssueAnalysisHistory } from "../services/issue.service";

export const analyzeIssueController = async (req: Request, res: Response) => {
  try {
    const { repoUrl, issueNumber } = req.body;

    const { owner, repo } = extractRepoInfo(repoUrl);
    const cacheKey = `issue:${owner}:${repo}:${issueNumber}`;
    const cachedAnalysis = await getCache(cacheKey);

    if (cachedAnalysis) {
      return res.status(200).json({
        success: true,
        cached: true,
        ...cachedAnalysis,
      });
    }

    const issue = await getIssue(owner, repo, Number(issueNumber));

    const analysis = await analyzeIssue(issue);
    const repository = await prisma.repository.findFirst({
      where: {
        owner,
        repoName: repo,
      },
    });

    // if (!repository) {
    //   throw new Error(
    //     "Repository not found. Please analyze the repository first."
    //   );
    // }
    let savedIssueAnalysis = null;

    if (repository) {
      savedIssueAnalysis = await saveIssueAnalysis(
        repository.id,
        issue.number,
        issue.title,
        analysis,
      );
    }

    const responseData = {
      issue: {
        number: issue.number,
        title: issue.title,
        state: issue.state,
        author: issue.user?.login,
        url: issue.html_url,
      },
      analysis,
      savedIssueAnalysis,
    };
    await setCache(cacheKey, responseData);

    res.status(200).json({
      success: true,
      cached: false,
      issue: {
        number: issue.number,
        title: issue.title,
        state: issue.state,
        author: issue.user?.login,
        url: issue.html_url,
      },
      analysis,
      savedIssueAnalysis,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRepositoryIssuesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { repoUrl } = req.body;

    const { owner, repo } = extractRepoInfo(repoUrl);

    const issues = await getRepositoryIssues(owner, repo);

    res.status(200).json({
      success: true,
      issues,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIssueHistoryController = async (req: any, res: Response) => {
  try {
    const history = await getIssueAnalysisHistory(req.user.userId);

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTrendingIssuesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const cacheKey = `issues:trending:${page}`;
    const cachedIssues = await getCache(cacheKey);

    if (cachedIssues) {
      return res.status(200).json({
        success: true,
        cached: true,
        page,
        issues: cachedIssues,
      });
    }

    const issues = await getTrendingIssues(page);
    await setCache(cacheKey, issues, 60 * 30);

    res.status(200).json({
      success: true,
      cached: false,
      page,
      issues,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGoodFirstIssuesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const cacheKey = `issues:good-first:${page}`;
    const cachedIssues = await getCache(cacheKey);

    if (cachedIssues) {
      return res.status(200).json({
        success: true,
        cached: true,
        page,
        issues: cachedIssues,
      });
    }

    const issues = await getGoodFirstIssues(page);
    await setCache(cacheKey, issues, 60 * 30);

    res.status(200).json({
      success: true,
      cached: false,
      page,
      issues,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch good first issues",
    });
  }
};

export const searchIssuesController = async (
  req: Request,
  res: Response
) => {
  try {
    const q = req.query.q as string;
    const query = String(q).trim();

    const page = Number(req.query.page) || 1;

    const cacheKey = `issues:search:${query.toLowerCase()}:${page}`;

    const cachedIssues = await getCache(cacheKey);

    if (cachedIssues) {
      return res.status(200).json({
        success: true,
        cached: true,
        page,
        issues: cachedIssues,
      });
    }

    const issues = await searchIssues(query, page);

    await setCache(
      cacheKey,
      issues,
      60 * 15 // 15 minutes
    );

    res.status(200).json({
      success: true,
      cached: false,
      page,
      issues,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search issues",
    });
  }
};
