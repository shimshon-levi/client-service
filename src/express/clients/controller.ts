import { Response } from "express";
import { ClientManager } from "./manager";
import { TypedRequest, TypedRequestWithUser } from "../../utils/zod";
import {
  createClientSchema,
  getByQueryClientsSchema,
  getMyClientsSchema,
} from "./validations";
import { IClient } from "./interface";

export class ClientController {
  static async create(
    req: TypedRequestWithUser<typeof createClientSchema>,
    res: Response
  ) {
    const { userId } = req.body;
    const advisorId = req.user.id;
    const client: IClient = { userId, advisorId };
    res.json(await ClientManager.createClient(client));
  }

  static async getMyClients(
    req: TypedRequestWithUser<typeof getMyClientsSchema>,
    res: Response
  ) {
    const advisorId = req.user.id;
    const clients = await ClientManager.getClientsByAdvisor(advisorId);
    res.json(clients);
  }

  // ⬅️ שינוי: להחזיר את כל הקשרים של המשתמש שמחובר כלקוח (מערך)
  static async getMe(
    req: TypedRequestWithUser<typeof getMyClientsSchema>,
    res: Response
  ) {
    const userId = req.user.id;
    const engagements = await ClientManager.getClientsByUser(userId);
    res.json(engagements); // מערך
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
