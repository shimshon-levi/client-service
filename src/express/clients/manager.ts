import { ClientModel } from "./model";
import { IClient } from "./interface";
// import { UserModel } from "./model"; // אם יש צורך להשתמש במודל משתמש

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
  static async addCaseToClient(clientId: string, caseId: string) {
    return await ClientModel.findByIdAndUpdate(
      clientId,
      { $push: { caseIds: caseId } },
      { new: true }
    );
  }
}
// init
