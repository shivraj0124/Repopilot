import { Router } from "express";
import { analyzeIssueController ,getIssueHistoryController,getRepositoryIssuesController,getTrendingIssuesController,getGoodFirstIssuesController,searchIssuesController} from "../controllers/issue.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { rateLimiter } from "../middleware/rateLimiter.middleware";
const router = Router();

router.post(
  "/analyze",
  authMiddleware,
  rateLimiter(20, 60 * 60),
  analyzeIssueController
);
/**
 * @swagger
 * /api/issues/list:
 *   post:
 *     summary: Get repository issues
 *     tags:
 *       - Issues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post(
  "/list",
  authMiddleware,
  getRepositoryIssuesController
);

router.get(
  "/history",
  authMiddleware,
  getIssueHistoryController
);

router.get(
  "/trending",
  getTrendingIssuesController
);

router.get(
  "/good-first",
  getGoodFirstIssuesController
);

router.get(
  "/search",
  searchIssuesController
);

export default router;