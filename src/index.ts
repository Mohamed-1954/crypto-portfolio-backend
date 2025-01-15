import express from "express";
import helmet from "helmet";
import authService from "@/services/auth/routes";
import portfolioService from "@/services/portfolio/routes";
import { ensureToken } from "./services/auth/middlewares";
import cryptoService from "@/services/crypto/routes";
import portfolioItemService from "@/services/portfolio-item/routes";
import config from "./config/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import yaml from "yaml";
import path from "node:path";
const app = express();

app.use(helmet());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const yamlFile = fs.readFileSync(path.join(__dirname, "./docs/swagger.yaml"), {
  encoding: "utf-8",
});
const swaggerOptions = yaml.parse(yamlFile);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.get("/docs.json", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerOptions);
});

app.use("/auth", authService);
app.use(ensureToken);
app.use("/portfolios", portfolioService);
app.use("/cryptos", cryptoService);
app.use("/portfolios/:id/items", portfolioItemService);

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
