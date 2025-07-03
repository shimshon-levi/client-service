<<<<<<< HEAD
import { Router } from "express";
import { CaseController } from "./controller";
import { validateRequest, wrapController } from "../../utils/express/wrappers";
import { createCaseSchema, updateCaseSchema } from "./validations";

export const casesRouter = Router();

casesRouter.post(
  "/",
  validateRequest(createCaseSchema),
  wrapController(CaseController.create)
);
casesRouter.get("/:id", wrapController(CaseController.getById));
casesRouter.get(
  "/client/:clientId",
  wrapController(CaseController.getByClient)
);
casesRouter.put(
  "/:id",
  validateRequest(updateCaseSchema),
  wrapController(CaseController.update)
);
=======
// init
>>>>>>> 83bd08017e0243b231e41ae12dc9dba2f577cbbd
