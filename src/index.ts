import express from "express";
import helmet from "helmet"
import cryptoService from "@/services/crypto/routes"
import portfolioItemService from "@/services/portfolio-item/routes"

const app = express();

app.use(express.json());
app.use(helmet());

app.use("/crypto", cryptoService);
app.use("/portfolios/:id/items", portfolioItemService);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
