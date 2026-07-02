import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis";

export const rateLimiter = (maxRequests: number, windowInSeconds: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const identifier = (req as any).user?.id || req.ip;

      const key = `rate-limit:${identifier}`;

      const currentRequests = await redisClient.incr(key);

      if (currentRequests === 1) {
        await redisClient.expire(key, windowInSeconds);
      }

      if (currentRequests > maxRequests) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }

      next();
    } catch (error) {
      console.error("Rate limiter error:", error);

      next();
    }
  };
};
