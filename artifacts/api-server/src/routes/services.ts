import { Router } from "express";
import { db } from "@workspace/db";
import { servicesTable } from "@workspace/db";

const router = Router();

router.get("/services", async (req, res) => {
  const services = await db.select().from(servicesTable);
  res.json(services);
});

export default router;
