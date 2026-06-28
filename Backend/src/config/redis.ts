import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("🔗 Connecting to Redis...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};