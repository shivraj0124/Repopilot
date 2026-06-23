import { Request, Response } from "express";
import { getTrendingRepositories } from "../services/github.service";

export const getExploreRepositories =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const page = Number(req.query.page) || 1;

      const repositories =
        await getTrendingRepositories(
          page
        );

      res.status(200).json({
        success: true,
        page,
        repositories,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };