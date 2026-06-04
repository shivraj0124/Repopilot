import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import testRoutes from "./routes/test.routes";
import authRoutes from "./routes/auth.routes";
import repositoryRoutes from "./routes/repository.routes";
app.use("/api/auth", authRoutes);
app.use(
  "/api/repositories",
  repositoryRoutes
);


app.use("/api", testRoutes);

app.get("/", (req, res) => {
  res.send("RepoPilot API Running");
});

export default app;