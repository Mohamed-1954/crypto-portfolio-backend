import { Router } from "express";
import { addCryptoToPortfolio, deleteCryptoFromPortfolio, updateCryptoInPortfolio } from "./handlers";

const router = Router({ mergeParams: true });

router.post("/", addCryptoToPortfolio);

router.put("/:item_id", updateCryptoInPortfolio);

router.delete("/:item_id", deleteCryptoFromPortfolio);

export default router;
