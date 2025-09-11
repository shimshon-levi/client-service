// cases/controller.ts
import { Response } from "express";
import { TypedRequestWithUser } from "../../utils/zod";
import { CaseManager } from "./manager";
import {
  createCaseSchema,
  updateCaseSchema,
  getCaseByIdSchema,
  createCaseFromTemplateSchema,
} from "./validations";

export class CaseController {
  static async create(
    req: TypedRequestWithUser<typeof createCaseSchema>,
    res: Response
  ) {
    const newCase = await CaseManager.createCase(req.body);
    res.status(201).json(newCase);
  }

  static async update(
    req: TypedRequestWithUser<typeof updateCaseSchema>,
    res: Response
  ) {
    const updated = await CaseManager.updateCase(req.params.id, req.body);
    res.json(updated);
  }

  static async getById(
    req: TypedRequestWithUser<typeof getCaseByIdSchema>,
    res: Response
  ) {
    const found = await CaseManager.getCaseById(req.params.id);
    res.json(found);
  }

  static async getMyCases(req: TypedRequestWithUser<any>, res: Response) {
    console.log("req.user", req.user);
    const { id, role } = req.user;
    const cases = await CaseManager.getCasesByUser(id, role);
    console.log("cases", cases);

    res.json(cases);
  }

  static async createFromTemplate(
    req: TypedRequestWithUser<typeof createCaseFromTemplateSchema>,
    res: Response
  ) {
    const newCase = await CaseManager.createFromTemplate(req.body);
    res.status(201).json(newCase);
  }
}
