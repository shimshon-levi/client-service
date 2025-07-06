import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // כל משתמש יכול להיות רק פעם אחת כלקוח
  },
  advisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caseIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ClientModel = mongoose.model("Client", clientSchema);
// init
