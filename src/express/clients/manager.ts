// src/express/clients/manager.ts
import { ClientModel } from "./model";
import type { IClient } from "./interface";

export class ClientManager {
  static async createClient({ userId, advisorId }: IClient) {
    return ClientModel.findOneAndUpdate(
      { userId, advisorId },
      { $setOnInsert: { userId, advisorId, createdAt: new Date() } },
      { upsert: true, new: true }
    );
  }

  static async getClientsByAdvisor(advisorId: string) {
    return ClientModel.find({ advisorId }).populate("userId");
  }

  // ⬅️ שינוי: להחזיר את כל הקשרים של הלקוח (מערך)
  static async getClientsByUser(userId: string) {
    return ClientModel.find({ userId }).populate("advisorId");
  }

  static async getByQuery(query: any, step = 0, limit = 10) {
    const filter: Record<string, any> = {};
    if (query.advisorId) filter.advisorId = query.advisorId;
    if (query.userId) filter.userId = query.userId;

    // הערה: סינון לפי role של user לא יעבוד כאן בלי aggregate/דה-נורמליזציה
    return ClientModel.find(filter)
      .skip(step * limit)
      .limit(limit)
      .populate("userId advisorId");
  }

  static async addCaseToClient(clientId: string, caseId: string) {
    return ClientModel.findByIdAndUpdate(
      clientId,
      { $addToSet: { caseIds: caseId } }, // ⬅️ עדיף מ-$push: לא מכפיל
      { new: true }
    );
  }
}
