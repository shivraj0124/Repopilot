import { Router } from "express";
import { analyzeIssueController ,getIssueHistoryController,getRepositoryIssuesController} from "../controllers/issue.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/analyze",
  authMiddleware,
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

export default router;