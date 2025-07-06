import { Response } from "express";
import { ClientManager } from "./manager";
import { TypedRequestWithUser } from "../../utils/zod";
import {
  createClientSchema,
  getByQueryClientsSchema,
  getMyClientsSchema,
} from "./validations";

export class ClientController {
  static async create(
    req: TypedRequestWithUser<typeof createClientSchema>,
    res: Response
  ) {
    const client = await ClientManager.createClient(req.body);
    res.status(201).json(client);
  }

  static async getMyClients(
    req: TypedRequestWithUser<typeof getMyClientsSchema>,
    res: Response
  ) {
    const advisorId = req.user.id;
    const clients = await ClientManager.getClientsByAdvisor(advisorId);
    res.json(clients);
  }

  static async getMe(
    req: TypedRequestWithUser<typeof getMyClientsSchema>,
    res: Response
  ) {
    console.log("🔐 User from token:", req.user);
    const userId = req.user.id;
    const client = await ClientManager.getClientByUserId(userId);
    res.json(client);
  }

  static async getByQuery(
    req: TypedRequestWithUser<typeof getByQueryClientsSchema>,
    res: Response
  ) {
    const { step = "0", limit = "10", ...query } = req.query;
    const clients = await ClientManager.getByQuery(query, +step, +limit);
    res.json(clients);
  }
}
// init
