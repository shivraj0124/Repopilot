import { Request, Response } from "express";
import { getProfileStats } from "../services/profile.service";

export const getProfileStatsController =
  async (
    req: any,
    res: Response
  ) => {
    try {
      const stats =
        await getProfileStats(
          req.user.id
        );

      res.status(200).json({
        success: true,
        stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };