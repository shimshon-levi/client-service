<<<<<<< HEAD
// clients/validations.ts
import { z } from "zod";
import { zodMongoObjectId } from "../../utils/zod";

// יצירת לקוח
export const createClientSchema = z.object({
  body: z.object({
    userId: zodMongoObjectId,
    advisorId: zodMongoObjectId,
  }),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

// עדכון לקוח
export const updateClientSchema = z.object({
  body: z.object({
    caseIds: z.array(zodMongoObjectId).optional(),
  }),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

// לקוחות שלי
export const getMyClientsSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

// לפי פילטר
export const getByQueryClientsSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z
    .object({
      step: z.string().regex(/^\d+$/).optional(),
      limit: z.string().regex(/^\d+$/).optional(),
      role: z.enum(["client", "admin"]).optional(),
      advisorId: zodMongoObjectId.optional(),
    })
    .default({}),
});
=======
// init
>>>>>>> 83bd08017e0243b231e41ae12dc9dba2f577cbbd
