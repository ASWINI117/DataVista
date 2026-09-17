const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "NEW",
        "CONTACTED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
);

const ServiceRequest = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);

module.exports = ServiceRequest;