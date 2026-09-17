const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Note = require("../models/Note");

const router = express.Router();


// =====================================================
// UPLOAD DIRECTORY
// =====================================================

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// =====================================================
// ALLOWED FILE EXTENSIONS
// =====================================================

const allowedExtensions = [
  ".pdf",

  ".doc",
  ".docx",

  ".xls",
  ".xlsx",

  ".ppt",
  ".pptx",

  ".csv",

  ".txt",
  ".md",
  ".json",

  ".jpg",
  ".jpeg",
  ".png",
  ".webp",

  ".zip",
  ".rar",
];


// =====================================================
// STORAGE
// =====================================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },

});


// =====================================================
// FILE FILTER
// =====================================================

const fileFilter = (req, file, cb) => {

  const extension =
    path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extension)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "File type not supported. Please upload PDF, Word, Excel, PowerPoint, CSV, TXT, image, ZIP or RAR."
      ),
      false
    );

  }

};


// =====================================================
// MULTER
// =====================================================

const upload = multer({

  storage: storage,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },

  fileFilter: fileFilter,

});


// =====================================================
// UPLOAD MATERIAL
// =====================================================

router.post(
  "/upload",
  (req, res, next) => {

    upload.single("note")(req, res, (error) => {

      if (error) {

        console.error(
          "Multer upload error:",
          error.message
        );

        return res.status(400).json({
          success: false,
          message: error.message,
        });

      }

      next();

    });

  },

  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });

      }


      const {
        topic,
        title,
        description,
      } = req.body;


      // ---------------------------------------------
      // REQUIRED FIELDS
      // ---------------------------------------------

      if (!topic || !title) {

        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        return res.status(400).json({
          success: false,
          message: "Topic and title are required",
        });

      }


      // ---------------------------------------------
      // FILE INFORMATION
      // ---------------------------------------------

      const extension =
        path
          .extname(req.file.originalname)
          .toLowerCase()
          .replace(".", "");


      let fileType = "Other";


      if (extension === "pdf") {
        fileType = "PDF";
      }

      else if (
        extension === "doc" ||
        extension === "docx"
      ) {
        fileType = "Word";
      }

      else if (
        extension === "xls" ||
        extension === "xlsx"
      ) {
        fileType = "Excel";
      }

      else if (
        extension === "ppt" ||
        extension === "pptx"
      ) {
        fileType = "PowerPoint";
      }

      else if (extension === "csv") {
        fileType = "CSV";
      }

      else if (
        extension === "txt" ||
        extension === "md" ||
        extension === "json"
      ) {
        fileType = "Text";
      }

      else if (
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "png" ||
        extension === "webp"
      ) {
        fileType = "Image";
      }

      else if (
        extension === "zip" ||
        extension === "rar"
      ) {
        fileType = "Archive";
      }


      // ---------------------------------------------
      // SAVE TO MONGODB
      // ---------------------------------------------

      const note = await Note.create({

        topic,

        title,

        description:
          description || "",

        originalName:
          req.file.originalname,

        fileName:
          req.file.filename,

        filePath:
          `/uploads/${req.file.filename}`,

        fileSize:
          req.file.size,

        fileType,

        mimeType:
          req.file.mimetype,

        fileExtension:
          extension,

      });


      // ---------------------------------------------
      // RESPONSE
      // ---------------------------------------------

      res.status(201).json({

        success: true,

        message:
          "Learning material uploaded successfully",

        note,

      });


    } catch (error) {

      console.error(
        "Upload error:",
        error
      );


      if (
        req.file &&
        fs.existsSync(req.file.path)
      ) {

        fs.unlinkSync(
          req.file.path
        );

      }


      res.status(500).json({

        success: false,

        message:
          "File upload failed",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// GET NOTES
// =====================================================

router.get("/", async (req, res) => {

  try {

    const {
      topic,
    } = req.query;


    let filter = {};


    if (topic) {

      filter.topic = topic;

    }


    const notes =
      await Note
        .find(filter)
        .sort({
          createdAt: -1,
        });


    res.json({

      success: true,

      count:
        notes.length,

      notes,

    });


  } catch (error) {

    console.error(
      "Get notes error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to fetch notes",

    });

  }

});


// =====================================================
// DELETE NOTE
// =====================================================

router.delete("/:id", async (req, res) => {

  try {

    const note =
      await Note.findById(
        req.params.id
      );


    if (!note) {

      return res.status(404).json({

        success: false,

        message:
          "Note not found",

      });

    }


    const filePath =
      path.join(
        __dirname,
        "..",
        "uploads",
        note.fileName
      );


    if (
      fs.existsSync(filePath)
    ) {

      fs.unlinkSync(filePath);

      console.log(
        "File deleted:",
        filePath
      );

    }


    await Note.findByIdAndDelete(
      req.params.id
    );


    res.json({

      success: true,

      message:
        "Learning material deleted successfully",

    });


  } catch (error) {

    console.error(
      "Delete note error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to delete learning material",

      error:
        error.message,

    });

  }

});


module.exports = router;