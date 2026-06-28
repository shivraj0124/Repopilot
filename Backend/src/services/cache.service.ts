import { redisClient } from "../config/redis";

export const getCache = async (key: string) => {
  const data = await redisClient.get(key);

  if (!data) return null;

  return JSON.parse(data);
};

export const setCache = async (
  key: string,
  value: any,
  expiry = 60 * 60 * 24 // 24 Hours
) => {
  await redisClient.set(
    key,
    JSON.stringify(value),
    {
      EX: expiry,
    }
  );
};

export const deleteCache = async (key: string) => {
  await redisClient.del(key);
};