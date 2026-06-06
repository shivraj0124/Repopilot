import { Router } from "express";
import { analyzeIssueController ,getRepositoryIssuesController} from "../controllers/issue.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/analyze",
  authMiddleware,
  analyzeIssueController
);

router.post(
  "/list",
  authMiddleware,
  getRepositoryIssuesController
);

export default router;