export interface IQuestion {
  question: string;
  fieldType: "text" | "number" | "date" | "textarea" | "select";
  required?: boolean;
}

export interface IRequiredDocument {
  name: string;
  description?: string;
  required?: boolean;
}

export interface ITemplate {
  advisorId: string;
  title: string;
  description?: string;
  questions?: IQuestion[];
  requiredDocuments?: IRequiredDocument[];
  createdAt?: Date;
}
