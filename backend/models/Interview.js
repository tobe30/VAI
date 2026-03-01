import mongoose from "mongoose";

const InterviewTurnSchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "InterviewSession", required: true },
    type: { type: String, enum: ["conceptual", "coding"], required: true },
    question: { type: String, required: true },

    answerText: { type: String },
    candidateCode: { type: String },
    language: { type: String },

    runOutput: { type: String },
    aiFeedback: { type: String },
    score: { type: Number },

    nextAction: { type: String, enum: ["FOLLOW_UP", "NEXT_QUESTION", "END"] },
    nextType: { type: String, enum: ["conceptual", "coding"] },
    nextQuestion: { type: String },
    difficulty: { type: String, default: "medium" },
  },
  { timestamps: true }
);

export const InterviewTurn = mongoose.model("InterviewTurn", InterviewTurnSchema);

const InterviewSessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk userId
    status: { type: String, enum: ["active", "ended"], default: "active" },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    track: { type: String, default: "general" },
    turnCount: { type: Number, default: 0 },
    lastQuestion: { type: String }, // quick access
    lastType: { type: String, enum: ["conceptual", "coding"] },
  },
  { timestamps: true }
);

export const InterviewSession = mongoose.model("InterviewSession", InterviewSessionSchema);