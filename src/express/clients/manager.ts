import { ClientModel } from "./model";
import { IClient } from "./interface";

export class ClientManager {
  static async createClient(data: IClient) {
    return await ClientModel.create(data);
  }

  static async getClientsByAdvisor(advisorId: string) {
    return await ClientModel.find({ advisorId }).populate("userId");
  }

  static async getClientByUserId(userId: string) {
    return await ClientModel.findOne({ userId }).populate("advisorId");
  }

  static async getByQuery(query: any, step = 0, limit = 10) {
    const filter: any = {};

    if (query.advisorId) filter.advisorId = query.advisorId;
    if (query.role) filter["userId.role"] = query.role; // אם מוּבנה בתוך user

    return await ClientModel.find(filter)
      .skip(step * limit)
      .limit(limit)
      .populate("userId advisorId");
  }
}
// init
