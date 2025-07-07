// cases/validations.ts
import { z } from "zod";
import { zodMongoObjectId } from "../../utils/zod";

const questionSchema = z.object({
  question: z.string(),
  fieldType: z.enum(["text", "number", "date", "textarea", "select"]),
  required: z.boolean().optional(),
  answer: z.any().optional(),
});

const requiredDocumentSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  uploadedDocumentId: zodMongoObjectId.optional(),
});

export const createCaseSchema = z.object({
  body: z.object({
    clientId: zodMongoObjectId,
    // advisorId: zodMongoObjectId,
    title: z.string(),
    description: z.string().optional(),
    questions: z.array(questionSchema).optional(),
    requiredDocuments: z.array(requiredDocumentSchema).optional(),
  }),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

export const updateCaseSchema = z.object({
  body: z.object({
    status: z.enum(["open", "in_progress", "completed", "closed"]).optional(),
    questions: z.array(questionSchema).optional(),
    requiredDocuments: z.array(requiredDocumentSchema).optional(),
  }),
  query: z.object({}).default({}),
  params: z.object({
    id: zodMongoObjectId,
  }),
});

export const getCaseByIdSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({}).default({}),
  params: z.object({
    id: zodMongoObjectId,
  }),
});

export const createCaseFromTemplateSchema = z.object({
  body: z.object({
    templateId: zodMongoObjectId,
    clientId: zodMongoObjectId,
  }),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});
