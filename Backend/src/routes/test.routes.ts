import { Router } from "express";
import prisma from "../config/prisma";
import { getRepository } from "../services/github.service";
const router = Router();

router.get("/db-test", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

router.get("/github-test", async (_req, res) => {
  try {
    const repo = await getRepository("facebook", "react");

    res.json({
      success: true,
      repo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "GitHub API Error",
    });
  }
});

export default router;