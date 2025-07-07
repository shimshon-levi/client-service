import { Router } from "express";
import { authMiddleware } from "../../utils/authMiddleware";
import { wrapController, validateRequest } from "../../utils/express/wrappers";
import { TemplateController } from "./controller";
import { createTemplateSchema, getTemplateByIdSchema } from "./validations";

export const templatesRouter = Router();

templatesRouter.use(authMiddleware);

templatesRouter.post(
  "/",
  validateRequest(createTemplateSchema),
  wrapController(TemplateController.create)
);

templatesRouter.get("/my", wrapController(TemplateController.getMyTemplates));

templatesRouter.get(
  "/:id",
  validateRequest(getTemplateByIdSchema),
  wrapController(TemplateController.getById)
);
