import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    target: {
      type: String,
      required: true,
      enum: [
        "Individual",
        "All Department",
        "Finance",
        "Sales Team",
        "Web Team",
        "Database Team",
      ],
    },

    noticeTitle: {
      type: String,
      required: true,
      trim: true,
    },

    employeeId: {
      type: String,
      required: true,
      trim: true,
    },

    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    noticeType: {
      type: [String],
      required: true,
      enum: [
        "Warning / Disciplinary",
        "Performance Improvement",
        "Appreciation / Recognition",
        "Attendance / Leave Issue",
        "Payroll / Compensation",
        "Contract / Role Update",
        "Advisory / Personal Reminder",
      ],
    },

    noticeBody: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notice", noticeSchema);
