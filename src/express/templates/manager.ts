import { TemplateModel } from "./model";
import { ITemplate } from "./interface";

export class TemplateManager {
  static async createTemplate(
    advisorId: string,
    data: Omit<ITemplate, "advisorId">
  ) {
    return await TemplateModel.create({ ...data, advisorId });
  }

  static async getTemplatesByAdvisor(advisorId: string) {
    return await TemplateModel.find({ advisorId });
  }

  static async getById(templateId: string) {
    return await TemplateModel.findById(templateId);
  }
}
