const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    // NEW
    fileType: {
      type: String,
      default: "unknown",
    },

    // NEW
    mimeType: {
      type: String,
      default: "application/octet-stream",
    },

    // NEW
    fileExtension: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;