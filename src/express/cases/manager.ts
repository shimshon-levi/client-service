import { CaseModel } from "./model";
import { ICase } from "./interface";

export const CaseManager = {
  async createCase(data: ICase) {
    return await CaseModel.create(data);
  },

  async getCaseById(id: string) {
    return await CaseModel.findById(id).populate("clientId");
  },

  async getCasesByClient(clientId: string) {
    return await CaseModel.find({ clientId }).populate("documents");
  },

  async updateCase(id: string, data: Partial<ICase>) {
    return await CaseModel.findByIdAndUpdate(id, data, { new: true });
  },
};
