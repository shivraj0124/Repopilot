import { Request, Response } from "express";
import { getTrendingRepositories } from "../services/github.service";
import { getCache, setCache } from "../services/cache.service";
export const getExploreRepositories = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const cacheKey = `explore:repositories:${page}`;
    const cachedRepositories = await getCache(cacheKey);

    if (cachedRepositories) {
      return res.status(200).json({
        success: true,
        cached: true,
        page,
        repositories: cachedRepositories,
      });
    }

    const repositories = await getTrendingRepositories(page);
    await setCache(
      cacheKey,
      repositories,
      60 * 30, // 30 minutes
    );

    res.status(200).json({
      success: true,
      cached: false,
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
