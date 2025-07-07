import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  fieldType: {
    type: String,
    enum: ["text", "number", "date", "textarea", "select"],
    required: true,
  },
  required: { type: Boolean, default: true },
});

const requiredDocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  required: { type: Boolean, default: true },
});

const templateSchema = new mongoose.Schema({
  advisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema],
  requiredDocuments: [requiredDocumentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TemplateModel = mongoose.model("Template", templateSchema);
