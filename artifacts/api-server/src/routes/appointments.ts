import { Router } from "express";
import { db } from "@workspace/db";
import { appointmentsTable, servicesTable } from "@workspace/db";
import { eq, count, sql } from "drizzle-orm";
import {
  CreateAppointmentBody,
  UpdateAppointmentBody,
  GetAppointmentParams,
  UpdateAppointmentParams,
  DeleteAppointmentParams,
  GetAvailableSlotsQueryParams,
} from "@workspace/api-zod";

const router = Router();

const ALL_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00",
];

router.get("/appointments/available-slots", async (req, res) => {
  const parsed = GetAvailableSlotsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query params" });
    return;
  }
  const { date, doctorId } = parsed.data;

  const where = doctorId
    ? sql`${appointmentsTable.date} = ${date} AND ${appointmentsTable.doctorId} = ${doctorId} AND ${appointmentsTable.status} != 'cancelled'`
    : sql`${appointmentsTable.date} = ${date} AND ${appointmentsTable.status} != 'cancelled'`;

  const booked = await db
    .select({ time: appointmentsTable.time })
    .from(appointmentsTable)
    .where(where);

  const bookedTimes = new Set(booked.map((b) => b.time));
  const slots = ALL_SLOTS.map((time) => ({
    time,
    available: !bookedTimes.has(time),
  }));

  res.json(slots);
});

router.get("/appointments", async (req, res) => {
  const appointments = await db
    .select()
    .from(appointmentsTable)
    .orderBy(appointmentsTable.createdAt);
  const mapped = appointments.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
  }));
  res.json(mapped);
});

router.post("/appointments", async (req, res) => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const data = parsed.data;
  const [created] = await db
    .insert(appointmentsTable)
    .values({
      patientName: data.patientName,
      patientPhone: data.patientPhone,
      patientEmail: data.patientEmail ?? null,
      serviceId: data.serviceId,
      doctorId: data.doctorId,
      date: data.date,
      time: data.time,
      notes: data.notes ?? null,
      status: "pending",
    })
    .returning();

  res.status(201).json({ ...created, createdAt: created.createdAt.toISOString() });
});

router.get("/appointments/:id", async (req, res) => {
  const parsed = GetAppointmentParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [appt] = await db
    .select()
    .from(appointmentsTable)
    .where(eq(appointmentsTable.id, parsed.data.id));

  if (!appt) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ...appt, createdAt: appt.createdAt.toISOString() });
});

router.patch("/appointments/:id", async (req, res) => {
  const idParsed = UpdateAppointmentParams.safeParse({ id: Number(req.params.id) });
  if (!idParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const bodyParsed = UpdateAppointmentBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const updates: Record<string, unknown> = {};
  if (bodyParsed.data.status !== undefined) updates.status = bodyParsed.data.status;
  if (bodyParsed.data.date !== undefined) updates.date = bodyParsed.data.date;
  if (bodyParsed.data.time !== undefined) updates.time = bodyParsed.data.time;
  if (bodyParsed.data.notes !== undefined) updates.notes = bodyParsed.data.notes;

  const [updated] = await db
    .update(appointmentsTable)
    .set(updates)
    .where(eq(appointmentsTable.id, idParsed.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
});

router.delete("/appointments/:id", async (req, res) => {
  const parsed = DeleteAppointmentParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  await db
    .delete(appointmentsTable)
    .where(eq(appointmentsTable.id, parsed.data.id));
  res.status(204).send();
});

router.get("/clinic/stats", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const [totalResult] = await db
    .select({ count: count() })
    .from(appointmentsTable);

  const [todayResult] = await db
    .select({ count: count() })
    .from(appointmentsTable)
    .where(eq(appointmentsTable.date, today));

  const [pendingResult] = await db
    .select({ count: count() })
    .from(appointmentsTable)
    .where(eq(appointmentsTable.status, "pending"));

  const [completedResult] = await db
    .select({ count: count() })
    .from(appointmentsTable)
    .where(eq(appointmentsTable.status, "completed"));

  res.json({
    totalAppointments: Number(totalResult.count),
    todayAppointments: Number(todayResult.count),
    pendingAppointments: Number(pendingResult.count),
    completedAppointments: Number(completedResult.count),
  });
});

export default router;
