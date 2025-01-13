import express from "express";
import helmet from "helmet"
import config from "@/config/config";
import authService from "@/services/auth/routes"
import portfolioService from "@/services/portfolio/routes";
import { ensureToken } from "./services/auth/middlewares";
import cryptoService from "@/services/crypto/routes"
import portfolioItemService from "@/services/portfolio-item/routes"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use("/auth", authService);
app.use(ensureToken);
app.use("/portfolio", portfolioService);
app.use("/crypto", cryptoService);
app.use("/portfolios/:id/items", portfolioItemService);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
