import express from "express";
import helmet from "helmet"
import config from "@/config/config";
import authService from "@/services/auth/routes"
import portfolioService from "@/services/portfolio/routes";
import { ensureToken } from "./services/auth/middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use("/auth", authService);
app.use(ensureToken);
app.use("/portfolio", portfolioService);

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
