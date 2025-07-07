// cases/router.ts
import { Router } from "express";
import { authMiddleware } from "../../utils/authMiddleware";
import { wrapController, validateRequest } from "../../utils/express/wrappers";
import { CaseController } from "./controller";
import {
  createCaseSchema,
  updateCaseSchema,
  getCaseByIdSchema,
  createCaseFromTemplateSchema,
} from "./validations";

export const casesRouter = Router();

casesRouter.use(authMiddleware);

casesRouter.post(
  "/",
  validateRequest(createCaseSchema),
  wrapController(CaseController.create)
);

casesRouter.patch(
  "/:id",
  validateRequest(updateCaseSchema),
  wrapController(CaseController.update)
);

casesRouter.get(
  "/:id",
  validateRequest(getCaseByIdSchema),
  wrapController(CaseController.getById)
);

casesRouter.post(
  "/from-template",
  validateRequest(createCaseFromTemplateSchema),
  wrapController(CaseController.createFromTemplate)
);

casesRouter.get("/my", wrapController(CaseController.getMyCases));
