import { Router } from "express";
import { ClientController } from "./controller";
import { wrapController, validateRequest } from "../../utils/express/wrappers";
import {
  createClientSchema,
  getMyClientsSchema,
  getByQueryClientsSchema,
} from "./validations";
import { requireAdmin } from "../../utils/requireAdmin";
import { authMiddleware } from "../../utils/authMiddleware";

export const clientsRouter = Router();

// כל הנתיבים כאן דורשים טוקן
clientsRouter.use(authMiddleware);

clientsRouter.post(
  "/",
  validateRequest(createClientSchema),
  wrapController(ClientController.create)
);

clientsRouter.get(
  "/my-clients",
  validateRequest(getMyClientsSchema),
  requireAdmin,
  wrapController(ClientController.getMyClients)
);

clientsRouter.get(
  "/me",
  validateRequest(getMyClientsSchema),
  wrapController(ClientController.getMe)
);

clientsRouter.get(
  "/",
  validateRequest(getByQueryClientsSchema),
  wrapController(ClientController.getByQuery)
);
// init
