import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f9be53a7/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== CAPSULE ROUTES ====================

// Get all capsules for current user
app.get("/make-server-f9be53a7/api/capsules", async (c) => {
  try {
    const userId = c.req.header("x-user-id") || "anonymous";
    const capsules = await kv.getByPrefix(`capsule:${userId}:`);
    return c.json(capsules || []);
  } catch (error) {
    console.error("Error fetching capsules:", error);
    return c.json({ error: "Failed to fetch capsules" }, 500);
  }
});

// Get received capsules
app.get("/make-server-f9be53a7/api/capsules/received", async (c) => {
  try {
    const userId = c.req.header("x-user-id") || "anonymous";
    const allCapsules = await kv.getByPrefix("capsule:");

    // Filter capsules where user is a recipient
    const receivedCapsules = (allCapsules || []).filter((capsule: any) => {
      if (!capsule.recipients) return false;
      return capsule.recipients.some((r: any) => r.userId === userId || r.value === userId);
    });

    return c.json(receivedCapsules);
  } catch (error) {
    console.error("Error fetching received capsules:", error);
    return c.json({ error: "Failed to fetch received capsules" }, 500);
  }
});

// Get capsule count
app.get("/make-server-f9be53a7/api/capsules/count", async (c) => {
  try {
    const userId = c.req.header("x-user-id") || "anonymous";
    const capsules = await kv.getByPrefix(`capsule:${userId}:`);
    return c.json({ count: capsules?.length || 0 });
  } catch (error) {
    console.error("Error counting capsules:", error);
    return c.json({ error: "Failed to count capsules" }, 500);
  }
});

// Get single capsule by ID
app.get("/make-server-f9be53a7/api/capsules/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userId = c.req.header("x-user-id") || "anonymous";
    const key = `capsule:${userId}:${id}`;

    const capsule = await kv.get(key);
    if (!capsule) {
      return c.json({ error: "Capsule not found" }, 404);
    }

    return c.json(capsule);
  } catch (error) {
    console.error("Error fetching capsule:", error);
    return c.json({ error: "Failed to fetch capsule" }, 500);
  }
});

// Create new capsule
app.post("/make-server-f9be53a7/api/capsules", async (c) => {
  try {
    const userId = c.req.header("x-user-id") || "anonymous";
    const capsuleData = await c.req.json();

    const id = capsuleData.id || `capsule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const key = `capsule:${userId}:${id}`;

    const capsule = {
      ...capsuleData,
      id,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, capsule);
    return c.json(capsule, 201);
  } catch (error) {
    console.error("Error creating capsule:", error);
    return c.json({ error: "Failed to create capsule" }, 500);
  }
});

// Update capsule
app.put("/make-server-f9be53a7/api/capsules/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userId = c.req.header("x-user-id") || "anonymous";
    const key = `capsule:${userId}:${id}`;

    const existingCapsule = await kv.get(key);
    if (!existingCapsule) {
      return c.json({ error: "Capsule not found" }, 404);
    }

    const updates = await c.req.json();
    const updatedCapsule = {
      ...existingCapsule,
      ...updates,
      id,
      userId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, updatedCapsule);
    return c.json(updatedCapsule);
  } catch (error) {
    console.error("Error updating capsule:", error);
    return c.json({ error: "Failed to update capsule" }, 500);
  }
});

// Delete capsule
app.delete("/make-server-f9be53a7/api/capsules/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userId = c.req.header("x-user-id") || "anonymous";
    const key = `capsule:${userId}:${id}`;

    await kv.del(key);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting capsule:", error);
    return c.json({ error: "Failed to delete capsule" }, 500);
  }
});

// Mark capsule as received
app.post("/make-server-f9be53a7/api/capsules/:id/mark-received", async (c) => {
  try {
    const id = c.req.param("id");
    const userId = c.req.header("x-user-id") || "anonymous";

    // Try to find the capsule across all users
    const allCapsules = await kv.getByPrefix("capsule:");
    const capsule = allCapsules?.find((cap: any) => cap.id === id);

    if (!capsule) {
      return c.json({ error: "Capsule not found" }, 404);
    }

    const key = `capsule:${capsule.userId}:${id}`;
    const updatedCapsule = {
      ...capsule,
      status: "received",
      receivedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, updatedCapsule);
    return c.json(updatedCapsule);
  } catch (error) {
    console.error("Error marking capsule as received:", error);
    return c.json({ error: "Failed to mark capsule as received" }, 500);
  }
});

// Claim pending capsules
app.post("/make-server-f9be53a7/api/capsules/claim-pending", async (c) => {
  try {
    const userId = c.req.header("x-user-id") || "anonymous";
    const { email } = await c.req.json();

    // Find capsules where user's email is a recipient
    const allCapsules = await kv.getByPrefix("capsule:");
    const pendingCapsules = (allCapsules || []).filter((capsule: any) => {
      if (!capsule.recipients) return false;
      return capsule.recipients.some((r: any) => r.value === email && r.status === "pending");
    });

    // Update recipient status to claimed
    for (const capsule of pendingCapsules) {
      const key = `capsule:${capsule.userId}:${capsule.id}`;
      const updatedCapsule = {
        ...capsule,
        recipients: capsule.recipients.map((r: any) =>
          r.value === email ? { ...r, status: "claimed", claimedBy: userId } : r
        ),
        updatedAt: new Date().toISOString(),
      };
      await kv.set(key, updatedCapsule);
    }

    return c.json({ claimed: pendingCapsules.length });
  } catch (error) {
    console.error("Error claiming pending capsules:", error);
    return c.json({ error: "Failed to claim pending capsules" }, 500);
  }
});

Deno.serve(app.fetch);