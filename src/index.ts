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

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(helmet());

app.use("/auth", authService);
app.use(ensureToken);
app.use("/portfolio", portfolioService);
app.use("/crypto", cryptoService);
app.use("/portfolios/:id/items", portfolioItemService);

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
export default app
