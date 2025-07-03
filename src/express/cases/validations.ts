<<<<<<< HEAD
import { z } from "zod";

export const createCaseSchema = z.object({
  clientId: z.string(),
  title: z.string().min(3),
  notes: z.string().optional(),
});

export const updateCaseSchema = z.object({
  status: z
    .enum(["open", "in_progress", "waiting_documents", "completed", "closed"])
    .optional(),
  notes: z.string().optional(),
});
=======
// init
>>>>>>> 83bd08017e0243b231e41ae12dc9dba2f577cbbd
