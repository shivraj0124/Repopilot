import { Request, Response } from "express";
import { getTrendingRepositories } from "../services/github.service";

export const getExploreRepositories =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const repositories =
        await getTrendingRepositories();

      res.status(200).json({
        success: true,
        repositories,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to fetch repositories",
      });
    }
  };