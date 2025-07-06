import { Request, Response } from "express";
import { CaseManager } from "./manager";

export const CaseController = {
  async create(req: Request, res: Response) {
    const created = await CaseManager.createCase(req.body);
    res.status(201).json(created);
  },

  async getById(req: Request, res: Response) {
    const caseDoc = await CaseManager.getCaseById(req.params.id);
    res.json(caseDoc);
  },

  async getByClient(req: Request, res: Response) {
    const clientId = req.params.clientId;
    const cases = await CaseManager.getCasesByClient(clientId);
    res.json(cases);
  },

  async update(req: Request, res: Response) {
    const updated = await CaseManager.updateCase(req.params.id, req.body);
    res.json(updated);
  },
};
// init
