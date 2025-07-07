import { z } from "zod";
import { zodMongoObjectId } from "../../utils/zod";

const questionSchema = z.object({
  question: z.string(),
  fieldType: z.enum(["text", "number", "date", "textarea", "select"]),
  required: z.boolean().optional(),
});

const requiredDocumentSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  required: z.boolean().optional(),
});

export const createTemplateSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    questions: z.array(questionSchema).optional(),
    requiredDocuments: z.array(requiredDocumentSchema).optional(),
  }),
  query: z.object({}).default({}),
  params: z.object({}).default({}),
});

export const getTemplateByIdSchema = z.object({
  params: z.object({
    id: zodMongoObjectId,
  }),
  query: z.object({}).default({}),
  body: z.object({}).default({}),
});
