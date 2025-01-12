import type { Response } from "express";
import db from "@/db";
import type {
  CreatePortfolioRequest,
  DeletePortfolioRequest,
  GetPortfolioByIdRequest,
  GetPortfoliosRequest,
  UpdatePortfolioRequest,
} from "./request-types";
import { and, eq } from "drizzle-orm";
import { portfolios } from "@/db/schema";
import { insertPortfolioSchema, updatePortfolioSchema } from "./validations";
import { z } from "zod";

export const getPortfolios = async (
  req: GetPortfoliosRequest,
  res: Response
) => {
  const userId = req.user.id;
  try {
    const userPortfolios = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.userId, userId));
    res.json(userPortfolios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolios", error });
  }
};

export const createPortfolio = async (
  req: CreatePortfolioRequest,
  res: Response
) => {
  const data = { ...req.body, userId: req.user?.id };
  const { error, data: validatedData } = insertPortfolioSchema.safeParse(data);
  if (error) {
    res.status(400).json({ message: "Error validating request body" });
    return;
  }
  try {
    const [newPortfolio] = await db
      .insert(portfolios)
      .values(validatedData)
      .returning();
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio", error });
  }
};

export const getPortfolioById = async (
  req: GetPortfolioByIdRequest,
  res: Response
) => {
  const userId = req.user?.id;
  const { error, data: id } = z.string().safeParse(req.params.id);
  if (error) {
    res.status(400).json({ message: "Error validating request params" });
    return;
  }
  try {
    const [portfolio] = await db
      .select()
      .from(portfolios)
      .where(and(eq(portfolios.id, id), eq(portfolios.userId, userId)));

    if (!portfolio) {
      res.status(404).json({ message: "Portfolio not found" });
      return;
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error });
  }
};

export const updatePortfolio = async (
  req: UpdatePortfolioRequest,
  res: Response
) => {
  const data = { ...req.body, id: req.params.id, userId: req.user?.id };
  const { error, data: validatedData } = updatePortfolioSchema.safeParse(data);
  if (error) {
    res.status(400).json({ message: "Error validating request body" });
    return;
  }
  try {
    const [updatedPortfolio] = await db
      .update(portfolios)
      .set({ name: validatedData.name })
      .where(
        and(
          eq(portfolios.id, validatedData.id),
          eq(portfolios.userId, validatedData.userId)
        )
      )
      .returning();

    if (!updatedPortfolio) {
      res
        .status(404)
        .json({ message: "Portfolio not found or not authorized" });
      return;
    }
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Error updating portfolio", error });
  }
};

export const deletePortfolioById = async (
  req: DeletePortfolioRequest,
  res: Response
) => {
  const userId = req.user?.id;
  const { error, data: id } = z.string().safeParse(req.params.id);
  if (error) {
    res.status(400).json({ message: "Error validating request params" });
    return;
  }
  try {
    const [deletedPortfolio] = await db
      .delete(portfolios)
      .where(and(eq(portfolios.id, id), eq(portfolios.userId, userId)))
      .returning();
    if (!deletedPortfolio) {
      res
        .status(404)
        .json({ message: "Portfolio not found or not authorized" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting portfolio", error });
  }
};
