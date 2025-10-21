// src/express/clients/validations.ts
import { z } from "zod";
import { zodMongoObjectId } from "../../utils/zod";

// יצירת לקוח/קשר: מקבלים רק מזהה הלקוח מה-body
export const createClientSchema = z.object({
  body: z
    .object({
      userId: zodMongoObjectId.optional(),
      clientUserId: zodMongoObjectId.optional(),
      advisorId: zodMongoObjectId.optional(), // ייתכן שישלח מהעבר — נתעלם
    })
    .refine((v) => !!(v.userId || v.clientUserId), {
      message: "userId או clientUserId נדרש",
      path: ["userId"],
    })
    // נרמול: תמיד נחזיר body עם { userId }
    .transform((v) => ({ userId: v.userId ?? v.clientUserId! })),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

// השאר ללא שינוי...
export const updateClientSchema = z.object({
  body: z.object({
    caseIds: z.array(zodMongoObjectId).optional(),
  }),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

export const getMyClientsSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

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
