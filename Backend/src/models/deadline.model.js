import mongoose from "mongoose";

const deadlineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["assignment", "lab", "quiz", "exam", "other"],
      required: true,
    },
    dueAt: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Deadline", deadlineSchema);
