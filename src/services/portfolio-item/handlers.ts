import type { Response } from "express";
import db from "../../db";
import portfolioItems from "@/db/schema/portfolio-item";
import { and, eq } from "drizzle-orm";
import type {
  AddCryptoToPortfolioRequest,
  DeleteCryptoFromPortfolioRequest,
  UpdateCryptoInPortfolioRequest,
} from "./request-types";
import { portfolios } from "@/db/schema";
import { insertPortfolioItemSchema, updatePortfolioItemSchema } from "./validations";
import { z } from "zod";

export const addCryptoToPortfolio = async (
  req: AddCryptoToPortfolioRequest,
  res: Response
) => {
  const userId = req.user.id;
  const { error: paramsError, data: portfolioId } = z
    .string()
    .safeParse(req.params.id);
  if (paramsError) {
    res.status(400).json({ error: "portfolio id is required" });
    return;
  }

  const { error: bodyError, data: validatedData } = insertPortfolioItemSchema.safeParse(req.body);
  console.log(bodyError);
  if (bodyError) {
    res
      .status(400)
      .json({ error: "cryptoId, quantity, and acquisitionCost are required" });
    return;
  }

  const { cryptoId, quantity, acquisitionCost } = validatedData;

  try {
    const portfolioExists = await db.query.portfolios.findFirst({
      where: and(eq(portfolios.id, portfolioId), eq(portfolios.userId, userId)),
    });

    if (!portfolioExists) {
      res.status(404).json({ error: "Portfolio not found" });
      return;
    }

    const [newItem] = await db
      .insert(portfolioItems)
      .values({
        portfolioId,
        cryptoId,
        quantity,
        acquisitionCost,
      })
      .returning();

    res.status(201).json({ message: "Portfolio item added", item: newItem });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the portfolio item" });
  }
};

export const updateCryptoInPortfolio = async (
  req: UpdateCryptoInPortfolioRequest,
  res: Response
) => {
  const { error: paramsError, data: validatedParams } = z.object({
      id: z.string(),
      item_id: z.string(),
    }).safeParse({ id: req.params.id, item_id: req.params.item_id });
  if (paramsError) {
    res.status(400).json({ error: "portfolio id is  required" });
    return;
  }

  const { error: bodyError, data: validatedData } =
    updatePortfolioItemSchema.safeParse(req.body);
  if (bodyError) {
    res
      .status(400)
      .json({ error: "cryptoId, quantity, and acquisitionCost are required" });
    return;
  }

  try {
    const itemExists = await db.query.portfolioItems.findFirst({
      where: (portfolioItems, { eq, and }) => and(
        eq(portfolioItems.id, validatedParams.item_id),
        eq(portfolioItems.portfolioId, validatedParams.id)
      ),
    })

    if (!itemExists) {
      res.status(404).json({ error: "Portfolio item not found" });
      return;
    }

    const [updatedItem] = await db
      .update(portfolioItems)
      .set(validatedData)
      .where(eq(portfolioItems.id, validatedParams.item_id))
      .returning();

    res
      .status(200)
      .json({ message: "Portfolio item updated", item: updatedItem });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the portfolio item" });
  }
};

export const deleteCryptoFromPortfolio = async (
  req: DeleteCryptoFromPortfolioRequest,
  res: Response
) => {
  const { error: paramsError, data: validatedParams } = z
    .object({
      id: z.string(),
      item_id: z.string(),
    })
    .safeParse({ id: req.params.id, item_id: req.params.item_id });
  if (paramsError) {
    res.status(400).json({ error: "portfolio id is  required" });
    return;
  }

  try {
    const itemExists = await db.query.portfolioItems.findFirst({
      where: and(
        eq(portfolioItems.id, validatedParams.item_id),
        eq(portfolioItems.portfolioId, validatedParams.id),
      ),
    });

    if (!itemExists) {
      res.status(404).json({ error: "Portfolio item not found" });
      return;
    }

    const [deleted] = await db
      .delete(portfolioItems)
      .where(eq(portfolioItems.id, validatedParams.item_id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: "Portfolio item deletion failed" });
      return;
    }

    res.status(200).json({ message: "Portfolio item deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the portfolio item" });
  }
};
