import { Router } from "express";

import {
  getExploreRepositories,
} from "../controllers/explore.controller";

const router = Router();

router.get(
  "/repositories",
  getExploreRepositories
);

export default router;