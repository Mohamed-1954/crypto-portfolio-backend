import { Router } from "express";
import { addCryptoToPortfolio, deleteCryptoFromPortfolio, updateCryptoInPortfolio } from "./handlers";

const router = Router();

router.post("/", addCryptoToPortfolio);

router.put("/item_id", updateCryptoInPortfolio);

router.delete("/item_id", deleteCryptoFromPortfolio);



export default router;
