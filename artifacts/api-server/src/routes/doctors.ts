import { Router } from "express";
import { db } from "@workspace/db";
import { doctorsTable } from "@workspace/db";

const router = Router();

router.get("/doctors", async (req, res) => {
  const doctors = await db.select().from(doctorsTable);
  res.json(doctors);
});

export default router;
