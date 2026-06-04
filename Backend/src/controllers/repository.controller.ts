import { Request, Response } from "express";
import { extractRepoInfo } from "../utils/github";
import { getRepository } from "../services/github.service";

export const analyzeRepository = async (
  req: Request,
  res: Response
) => {
  try {
    const { repoUrl } = req.body;

    const { owner, repo } =
      extractRepoInfo(repoUrl);

    const repository =
      await getRepository(owner, repo);

    res.status(200).json({
      success: true,
      repository,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};