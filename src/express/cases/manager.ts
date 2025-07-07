// cases/manager.ts
import { CaseModel } from "./model";
import { ICase } from "./interface";
import { TemplateModel } from "../templates/model";

export class CaseManager {
  static async createCase(data: ICase) {
    return await CaseModel.create(data);
  }

  static async updateCase(caseId: string, updates: Partial<ICase>) {
    return await CaseModel.findByIdAndUpdate(caseId, updates, { new: true });
  }

  static async getCaseById(caseId: string) {
    return await CaseModel.findById(caseId)
      .populate("clientId")
      .populate("advisorId")
      .populate("requiredDocuments.uploadedDocumentId");
  }

  static async getCasesByUser(userId: string, role: "admin" | "client") {
    const filter =
      role === "admin" ? { advisorId: userId } : { "clientId.userId": userId };
    return await CaseModel.find(filter)
      .populate("clientId")
      .populate("advisorId");
  }
  static async createFromTemplate({
    templateId,
    clientId,
  }: {
    templateId: string;
    clientId: string;
  }) {
    const template = await TemplateModel.findById(templateId);
    if (!template) throw new Error("Template not found");

    return await CaseModel.create({
      clientId,
      title: template.title,
      description: template.description,
      questions: template.questions,
      requiredDocuments: template.requiredDocuments,
    });
  }
}
