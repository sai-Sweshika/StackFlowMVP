import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, orgName } = req.body;

    if (!email || !password || !orgName) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const org = await prisma.organization.create({
      data: { name: orgName }
    });

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        orgId: org.id
      }
    });

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});




router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, orgId: user.orgId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
