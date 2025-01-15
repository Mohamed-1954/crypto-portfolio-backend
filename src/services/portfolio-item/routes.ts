import { Router } from "express";
import { addCryptoToPortfolio, deleteCryptoFromPortfolio, updateCryptoInPortfolio } from "./handlers";
import { ensureAuthenticated } from "../auth/middlewares";

const router = Router({ mergeParams: true });

router.use(ensureAuthenticated)

router.post("/", addCryptoToPortfolio);

router.put("/:item_id", updateCryptoInPortfolio);

router.delete("/:item_id", deleteCryptoFromPortfolio);

export default router;
