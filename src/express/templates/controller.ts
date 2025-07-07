import { Response } from "express";
import { TypedRequestWithUser } from "../../utils/zod";
import { createTemplateSchema, getTemplateByIdSchema } from "./validations";
import { TemplateManager } from "./manager";

export class TemplateController {
  static async create(
    req: TypedRequestWithUser<typeof createTemplateSchema>,
    res: Response
  ) {
    const advisorId = req.user.id;
    const template = await TemplateManager.createTemplate(advisorId, req.body);
    res.status(201).json(template);
  }

  static async getMyTemplates(req: TypedRequestWithUser<any>, res: Response) {
    const advisorId = req.user.id;
    const templates = await TemplateManager.getTemplatesByAdvisor(advisorId);
    res.json(templates);
  }

  static async getById(
    req: TypedRequestWithUser<typeof getTemplateByIdSchema>,
    res: Response
  ) {
    const template = await TemplateManager.getById(req.params.id);
    res.json(template);
  }
}
