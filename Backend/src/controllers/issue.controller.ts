import { Request, Response } from "express";
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

    res.status(200).json({
      success: true,
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
    const issues = await getTrendingIssues();

    res.status(200).json({
      success: true,
      issues,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch trending issues",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Good First Issues
|--------------------------------------------------------------------------
*/

export const getGoodFirstIssuesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const issues = await getGoodFirstIssues();

    res.status(200).json({
      success: true,
      issues,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch good first issues",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Search Issues
|--------------------------------------------------------------------------
*/

export const searchIssuesController = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    const issues = await searchIssues(query);

    res.status(200).json({
      success: true,
      issues,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search issues",
    });
  }
};
