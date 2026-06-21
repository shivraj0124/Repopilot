import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import passport from "./config/passport";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
console.log("Hello IDs");
console.log(process.env.GITHUB_CLIENT_ID);
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import testRoutes from "./routes/test.routes";
import authRoutes from "./routes/auth.routes";
import repositoryRoutes from "./routes/repository.routes";
import issueRoutes from "./routes/issue.routes";
import exploreRoutes from "./routes/explore.routes";
import profileRoutes from "./routes/profile.routes";


app.use("/api/auth", authRoutes);
app.use("/api/repositories",repositoryRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/explore",exploreRoutes);
app.use("/api/profile", profileRoutes);


app.use("/api", testRoutes);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));



export default app;