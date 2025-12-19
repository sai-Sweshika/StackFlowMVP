import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET PRODUCTS (org scoped)
router.get("/", auth, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        orgId: req.user.orgId,
      },
    });
    res.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// CREATE PRODUCT (org scoped)
router.post("/", auth, async (req, res) => {
  try {
    const { name, sku, quantity, lowStock, costPrice, sellPrice } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        quantity,
        lowStock,
        orgId: req.user.orgId, // 🔥 REQUIRED FIX
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
});

router.get("/summary", auth, async (req, res) => {
  try {
    const orgId = req.user.orgId;

    const products = await prisma.product.findMany({
      where: { orgId }
    });

    const totalProducts = products.length;
    const totalQuantity = products.reduce(
      (sum, p) => sum + p.quantity,
      0
    );

    const lowStock = products.filter(
      p => p.lowStock !== null && p.quantity <= p.lowStock
    );

    res.json({
      totalProducts,
      totalQuantity,
      lowStock
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load summary" });
  }
});


export default router;
