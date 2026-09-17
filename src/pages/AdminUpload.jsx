
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

function AdminUpload() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const topics = [
    "Data Analytics",
    "Python for Data Analytics",
    "Pandas",
    "SQL",
    "Excel",
    "Statistics",
    "Power BI",
    "Data Visualization",
    "Data Analyst Interview Questions",
  ];

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

  const getExtension = (fileName) => {
    const parts = fileName.split(".");

    if (parts.length < 2) {
      return "";
    }

    return "." + parts.pop().toLowerCase();
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileType = (extension) => {
    const types = {
      ".pdf": "PDF Document",
      ".doc": "Word Document",
      ".docx": "Word Document",
      ".xls": "Excel Spreadsheet",
      ".xlsx": "Excel Spreadsheet",
      ".ppt": "PowerPoint Presentation",
      ".pptx": "PowerPoint Presentation",
      ".csv": "CSV File",
      ".txt": "Text File",
      ".md": "Markdown File",
      ".json": "JSON File",
      ".jpg": "Image",
      ".jpeg": "Image",
      ".png": "Image",
      ".webp": "Image",
      ".zip": "ZIP Archive",
      ".rar": "RAR Archive",
    };

    return types[extension] || "Learning Material";
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setMessage("");
    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const extension = getExtension(selectedFile.name);

    // Check extension
    if (!allowedExtensions.includes(extension)) {
      setFile(null);

      e.target.value = "";

      setError(
        "Unsupported file type. Please upload PDF, Word, Excel, PowerPoint, CSV, TXT, Markdown, JSON, image, ZIP or RAR."
      );

      return;
    }

    // Maximum 50 MB
    const maxSize = 50 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setFile(null);

      e.target.value = "";

      setError("File size must be 50 MB or less.");

      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!topic) {
      setError("Please select a topic.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a note title.");
      return;
    }

    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();

    formData.append("topic", topic);
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("note", file);

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notes/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Upload failed.");
        return;
      }

      setMessage(
        "Learning material uploaded successfully! 🎉"
      );

      setTopic("");
      setTitle("");
      setDescription("");
      setFile(null);

      const fileInput = document.getElementById("note-file");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      console.error("Upload error:", err);

      setError(
        "Cannot connect to DataVista server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "50px 20px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            color: "#0f172a",
          }}
        >
          Upload Learning Material
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          Upload notes, presentations, datasets, documents
          and other learning resources for DataVista students.
        </p>

        <form onSubmit={handleUpload}>
          {/* TOPIC */}

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#0f172a",
              }}
            >
              Select Topic
            </label>

            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "15px",
                background: "#ffffff",
                boxSizing: "border-box",
              }}
            >
              <option value="">
                -- Select Topic --
              </option>

              {topics.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* TITLE */}

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#0f172a",
              }}
            >
              Note Title
            </label>

            <input
              type="text"
              placeholder="Example: SQL Query Fundamentals"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* DESCRIPTION */}

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#0f172a",
              }}
            >
              Description
            </label>

            <textarea
              placeholder="Short description about this learning material"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "15px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* FILE */}

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#0f172a",
              }}
            >
              Select File
            </label>

            <input
              id="note-file"
              type="file"
              accept={allowedExtensions.join(",")}
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                background: "#ffffff",
              }}
            />

            {file && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  background: "#f1f5f9",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  📁 {file.name}
                </div>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  Type:{" "}
                  <strong>
                    {getFileType(getExtension(file.name))}
                  </strong>
                  <br />

                  Size:{" "}
                  <strong>
                    {formatFileSize(file.size)}
                  </strong>
                  <br />

                  Extension:{" "}
                  <strong>
                    {getExtension(file.name)}
                  </strong>
                </div>
              </div>
            )}
          </div>

          {/* ERROR */}

          {error && (
            <div
              style={{
                marginBottom: "20px",
                padding: "12px 15px",
                borderRadius: "8px",
                background: "#fee2e2",
                color: "#b91c1c",
                lineHeight: "1.5",
              }}
            >
              ❌ {error}
            </div>
          )}

          {/* SUCCESS */}

          {message && (
            <div
              style={{
                marginBottom: "20px",
                padding: "12px 15px",
                borderRadius: "8px",
                background: "#dcfce7",
                color: "#166534",
                lineHeight: "1.5",
              }}
            >
              ✅ {message}
            </div>
          )}

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "13px 24px",
                border: "none",
                borderRadius: "8px",
                background: loading
                  ? "#94a3b8"
                  : "#2563eb",
                color: "#ffffff",
                fontWeight: "600",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Uploading..."
                : "Publish Material"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin-dashboard")
              }
              style={{
                padding: "13px 24px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#334155",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </form>

        {/* SUPPORTED FILES */}

        <div
          style={{
            marginTop: "35px",
            padding: "18px",
            background: "#f1f5f9",
            borderRadius: "10px",
          }}
        >
          <strong
            style={{
              color: "#0f172a",
            }}
          >
            Supported Files
          </strong>

          <p
            style={{
              marginBottom: 0,
              color: "#64748b",
              lineHeight: "1.7",
            }}
          >
            PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX,
            CSV, TXT, MD, JSON, JPG, JPEG, PNG,
            WEBP, ZIP and RAR.
          </p>

          <p
            style={{
              marginBottom: 0,
              marginTop: "8px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Maximum file size: <strong>50 MB</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminUpload;