
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://datavista-backend-w0zt.onrender.com";

function AdminDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // SERVICE REQUEST STATES
  // =====================================================

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [requestError, setRequestError] = useState("");

  // =====================================================
  // LEARNING NOTES STATES
  // =====================================================

  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [notesError, setNotesError] = useState("");
  const [deletingNoteId, setDeletingNoteId] = useState("");

  // =====================================================
  // FETCH SERVICE REQUESTS
  // =====================================================

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      setRequestError("");

      const response = await fetch(
        `${API_BASE_URL}/api/service-requests`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch service requests");
      }

      const data = await response.json();

      if (data.success) {
        setRequests(data.requests || []);
      } else {
        setRequestError(
          data.message || "Failed to fetch service requests"
        );
      }
    } catch (error) {
      console.error("Fetch requests error:", error);
      setRequestError("Unable to load service requests.");
    } finally {
      setLoadingRequests(false);
    }
  };

  // =====================================================
  // FETCH LEARNING NOTES
  // =====================================================

  const fetchNotes = async () => {
    try {
      setLoadingNotes(true);
      setNotesError("");

      const response = await fetch(
        `${API_BASE_URL}/api/notes`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch learning notes");
      }

      const data = await response.json();

      if (data.success) {
        setNotes(data.notes || []);
      } else {
        setNotesError(
          data.message || "Failed to fetch learning notes"
        );
      }
    } catch (error) {
      console.error("Fetch notes error:", error);
      setNotesError("Unable to load learning notes.");
    } finally {
      setLoadingNotes(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchRequests();
    fetchNotes();
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("datavista_admin");
    navigate("/admin-login");
  };

  // =====================================================
  // UPDATE SERVICE REQUEST STATUS
  // =====================================================

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/service-requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          request._id === id
            ? {
                ...request,
                status: data.request.status,
              }
            : request
        )
      );
    } catch (error) {
      console.error("Update status error:", error);
      alert("Failed to update request status.");
    }
  };

  // =====================================================
  // CONTACT CUSTOMER
  // =====================================================

  const contactCustomer = (request) => {
    const subject = `DataVista Service Request - ${request.service}`;

    const body = `Hello ${request.name},

Thank you for contacting DataVista.

We received your service request for ${request.service}.

We would like to discuss your project requirements with you.

Regards,
DataVista
See Your Data. Make Better Decisions.`;

    const mailtoUrl =
      `mailto:${request.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  // =====================================================
  // DELETE LEARNING MATERIAL
  // =====================================================

  const deleteNote = async (note) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${note.title}"?\n\nThis will permanently remove this learning material.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingNoteId(note._id);

      const response = await fetch(
        `${API_BASE_URL}/api/notes/${note._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete note"
        );
      }

      setNotes((previousNotes) =>
        previousNotes.filter(
          (item) => item._id !== note._id
        )
      );

      alert("Learning material deleted successfully.");
    } catch (error) {
      console.error("Delete note error:", error);
      alert("Failed to delete learning material.");
    } finally {
      setDeletingNoteId("");
    }
  };

  // =====================================================
  // FILE HELPERS
  // =====================================================

  const getFileExtension = (fileName = "") => {
    const parts = fileName.split(".");

    if (parts.length < 2) {
      return "";
    }

    return parts.pop().toLowerCase();
  };

  const getFileIcon = (extension) => {
    const icons = {
      pdf: "📕",
      doc: "📝",
      docx: "📝",
      xls: "📗",
      xlsx: "📗",
      ppt: "📑",
      pptx: "📑",
      csv: "📊",
      txt: "📄",
      md: "📄",
      json: "🔧",
      jpg: "🖼️",
      jpeg: "🖼️",
      png: "🖼️",
      webp: "🖼️",
      zip: "🗜️",
      rar: "🗜️",
    };

    return icons[extension] || "📁";
  };

  const getFileTypeName = (extension) => {
    const names = {
      pdf: "PDF Document",
      doc: "Word Document",
      docx: "Word Document",
      xls: "Excel Spreadsheet",
      xlsx: "Excel Spreadsheet",
      ppt: "PowerPoint Presentation",
      pptx: "PowerPoint Presentation",
      csv: "CSV File",
      txt: "Text Document",
      md: "Markdown Document",
      json: "JSON File",
      jpg: "Image",
      jpeg: "Image",
      png: "Image",
      webp: "Image",
      zip: "ZIP Archive",
      rar: "RAR Archive",
    };

    return names[extension] || "Learning Material";
  };

  const isPdfFile = (extension) => {
    return extension === "pdf";
  };

  const isImageFile = (extension) => {
    return ["jpg", "jpeg", "png", "webp"].includes(
      extension
    );
  };

  const isBrowserPreviewFile = (extension) => {
    return [
      "txt",
      "md",
      "json",
      "csv",
    ].includes(extension);
  };

  // =====================================================
  // OPEN FILE
  // =====================================================

  const openFile = (filePath) => {
    const fileUrl = `${API_BASE_URL}${filePath}`;

    window.open(
      fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================================
  // DOWNLOAD FILE
  // =====================================================

  const downloadFile = (note) => {
    const fileUrl =
      `${API_BASE_URL}${note.filePath}`;

    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = note.originalName || note.fileName;
    link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =====================================================
  // FORMAT FILE SIZE
  // =====================================================

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) {
      return "Unknown size";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    return new Date(date).toLocaleString();
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "NEW":
        return {
          backgroundColor: "#dbeafe",
          color: "#1d4ed8",
        };

      case "CONTACTED":
        return {
          backgroundColor: "#fef3c7",
          color: "#92400e",
        };

      case "IN_PROGRESS":
        return {
          backgroundColor: "#ede9fe",
          color: "#6d28d9",
        };

      case "COMPLETED":
        return {
          backgroundColor: "#dcfce7",
          color: "#166534",
        };

      case "CANCELLED":
        return {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
        };

      default:
        return {
          backgroundColor: "#f3f4f6",
          color: "#374151",
        };
    }
  };

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            DataVista Admin Dashboard
          </h1>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage your DataVista learning content and
            customer service requests.
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            border: "none",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "11px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </header>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* =================================================
            DASHBOARD CARDS
        ================================================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* LEARNING NOTES */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "24px",
              boxShadow:
                "0 4px 12px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                marginBottom: "12px",
              }}
            >
              📚
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
              }}
            >
              Learning Materials
            </h2>

            <p
              style={{
                margin: "0 0 18px",
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              {notes.length} material
              {notes.length !== 1 ? "s" : ""} uploaded.
            </p>

            <button
              onClick={() =>
                navigate("/admin/notes/upload")
              }
              style={{
                border: "none",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Upload Material
            </button>
          </div>

          {/* SERVICE REQUESTS */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "24px",
              boxShadow:
                "0 4px 12px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                marginBottom: "12px",
              }}
            >
              📩
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
              }}
            >
              Service Requests
            </h2>

            <div
              style={{
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "4px",
              }}
            >
              {requests.length}
            </div>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Total Requests
            </p>
          </div>

          {/* ADMIN */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "24px",
              boxShadow:
                "0 4px 12px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                marginBottom: "12px",
              }}
            >
              ⚙️
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
              }}
            >
              Admin
            </h2>

            <p
              style={{
                margin: "0 0 14px",
                color: "#64748b",
                lineHeight: "1.5",
              }}
            >
              You are currently logged in as DataVista
              Admin.
            </p>

            <span
              style={{
                display: "inline-block",
                backgroundColor: "#dcfce7",
                color: "#166534",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Logged In
            </span>
          </div>
        </div>

        {/* =================================================
            LEARNING MATERIALS
        ================================================= */}

        <section
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "28px",
            marginBottom: "40px",
            boxShadow:
              "0 4px 12px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                }}
              >
                📚 Learning Materials
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#64748b",
                }}
              >
                View, open, download and manage all uploaded
                DataVista learning materials.
              </p>
            </div>

            <button
              onClick={fetchNotes}
              style={{
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                padding: "9px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              🔄 Refresh
            </button>
          </div>

          {/* LOADING */}

          {loadingNotes && (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              Loading learning materials...
            </div>
          )}

          {/* ERROR */}

          {!loadingNotes && notesError && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#991b1b",
                padding: "16px",
                borderRadius: "10px",
              }}
            >
              {notesError}
            </div>
          )}

          {/* EMPTY */}

          {!loadingNotes &&
            !notesError &&
            notes.length === 0 && (
              <div
                style={{
                  padding: "35px",
                  textAlign: "center",
                  border: "1px dashed #cbd5e1",
                  borderRadius: "12px",
                  color: "#64748b",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "10px",
                  }}
                >
                  📄
                </div>

                <h3
                  style={{
                    margin: "0 0 8px",
                    color: "#334155",
                  }}
                >
                  No learning materials uploaded
                </h3>

                <p style={{ margin: 0 }}>
                  Upload your first learning material to
                  display it here.
                </p>
              </div>
            )}

          {/* MATERIAL LIST */}

          {!loadingNotes &&
            !notesError &&
            notes.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gap: "18px",
                }}
              >
                {notes.map((note) => {
                  const extension = getFileExtension(
                    note.originalName
                  );

                  const fileIcon =
                    getFileIcon(extension);

                  const fileType =
                    note.fileType ||
                    getFileTypeName(extension);

                  const fileUrl =
                    `${API_BASE_URL}${note.filePath}`;

                  const isPdf =
                    isPdfFile(extension);

                  const isImage =
                    isImageFile(extension);

                  const canPreview =
                    isPdf ||
                    isImage ||
                    isBrowserPreviewFile(
                      extension
                    );

                  return (
                    <div
                      key={note._id}
                      style={{
                        border:
                          "1px solid #e2e8f0",
                        borderRadius: "14px",
                        overflow: "hidden",
                        backgroundColor:
                          "#f8fafc",
                      }}
                    >
                      {/* MATERIAL HEADER */}

                      <div
                        style={{
                          padding: "20px",
                          backgroundColor:
                            "#ffffff",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "flex-start",
                            gap: "20px",
                            flexWrap:
                              "wrap",
                          }}
                        >
                          {/* INFO */}

                          <div
                            style={{
                              flex: "1 1 500px",
                              minWidth: 0,
                            }}
                          >
                            <div
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: "10px",
                                flexWrap:
                                  "wrap",
                                marginBottom:
                                  "10px",
                              }}
                            >
                              <span
                                style={{
                                  backgroundColor:
                                    "#dbeafe",
                                  color:
                                    "#1d4ed8",
                                  padding:
                                    "5px 10px",
                                  borderRadius:
                                    "999px",
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    "700",
                                }}
                              >
                                {note.topic}
                              </span>

                              <span
                                style={{
                                  backgroundColor:
                                    "#f1f5f9",
                                  color:
                                    "#475569",
                                  padding:
                                    "5px 10px",
                                  borderRadius:
                                    "999px",
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    "700",
                                }}
                              >
                                {fileIcon}{" "}
                                {fileType}
                              </span>
                            </div>

                            <h3
                              style={{
                                margin:
                                  "0 0 8px",
                                fontSize:
                                  "20px",
                                color:
                                  "#0f172a",
                              }}
                            >
                              {note.title}
                            </h3>

                            {note.description && (
                              <p
                                style={{
                                  margin:
                                    "0 0 12px",
                                  color:
                                    "#64748b",
                                  lineHeight:
                                    "1.5",
                                }}
                              >
                                {
                                  note.description
                                }
                              </p>
                            )}

                            {/* FILE INFO */}

                            <div
                              style={{
                                padding:
                                  "12px",
                                backgroundColor:
                                  "#f8fafc",
                                borderRadius:
                                  "8px",
                                border:
                                  "1px solid #e2e8f0",
                                wordBreak:
                                  "break-word",
                              }}
                            >
                              <div
                                style={{
                                  fontWeight:
                                    "600",
                                  color:
                                    "#334155",
                                  marginBottom:
                                    "5px",
                                }}
                              >
                                {fileIcon}{" "}
                                {
                                  note.originalName
                                }
                              </div>

                              <div
                                style={{
                                  fontSize:
                                    "13px",
                                  color:
                                    "#64748b",
                                  lineHeight:
                                    "1.6",
                                }}
                              >
                                Type:{" "}
                                {fileType}
                                {" • "}
                                Size:{" "}
                                {formatFileSize(
                                  note.fileSize
                                )}
                                {" • "}
                                Extension: .
                                {extension ||
                                  "unknown"}
                                {" • "}
                                Uploaded:{" "}
                                {formatDate(
                                  note.createdAt
                                )}
                              </div>
                            </div>
                          </div>

                          {/* ACTIONS */}

                          <div
                            style={{
                              display:
                                "flex",
                              gap: "10px",
                              flexWrap:
                                "wrap",
                              alignItems:
                                "center",
                              flex:
                                "0 0 auto",
                            }}
                          >
                            {canPreview && (
                              <button
                                onClick={() =>
                                  openFile(
                                    note.filePath
                                  )
                                }
                                style={{
                                  border:
                                    "none",
                                  backgroundColor:
                                    "#2563eb",
                                  color:
                                    "#ffffff",
                                  padding:
                                    "10px 15px",
                                  borderRadius:
                                    "8px",
                                  cursor:
                                    "pointer",
                                  fontWeight:
                                    "600",
                                }}
                              >
                                {isPdf
                                  ? "📖 Open PDF"
                                  : isImage
                                  ? "🖼️ Open Image"
                                  : "👁️ Open"}
                              </button>
                            )}

                            <button
                              onClick={() =>
                                downloadFile(
                                  note
                                )
                              }
                              style={{
                                border:
                                  "1px solid #cbd5e1",
                                backgroundColor:
                                  "#ffffff",
                                color:
                                  "#0f172a",
                                padding:
                                  "10px 15px",
                                borderRadius:
                                  "8px",
                                cursor:
                                  "pointer",
                                fontWeight:
                                  "600",
                              }}
                            >
                              ⬇️ Download
                            </button>

                            <button
                              onClick={() =>
                                deleteNote(
                                  note
                                )
                              }
                              disabled={
                                deletingNoteId ===
                                note._id
                              }
                              style={{
                                border:
                                  "1px solid #fecaca",
                                backgroundColor:
                                  "#fef2f2",
                                color:
                                  "#dc2626",
                                padding:
                                  "10px 15px",
                                borderRadius:
                                  "8px",
                                cursor:
                                  deletingNoteId ===
                                  note._id
                                    ? "not-allowed"
                                    : "pointer",
                                fontWeight:
                                  "600",
                                opacity:
                                  deletingNoteId ===
                                  note._id
                                    ? 0.6
                                    : 1,
                              }}
                            >
                              {deletingNoteId ===
                              note._id
                                ? "Deleting..."
                                : "🗑️ Delete"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* PDF PREVIEW */}

                      {isPdf && (
                        <div
                          style={{
                            backgroundColor:
                              "#e2e8f0",
                            padding: "15px",
                          }}
                        >
                          <iframe
                            src={fileUrl}
                            title={
                              note.title
                            }
                            style={{
                              width:
                                "100%",
                              height:
                                "600px",
                              border:
                                "1px solid #cbd5e1",
                              borderRadius:
                                "8px",
                              backgroundColor:
                                "#ffffff",
                            }}
                          />
                        </div>
                      )}

                      {/* IMAGE PREVIEW */}

                      {isImage && (
                        <div
                          style={{
                            backgroundColor:
                              "#e2e8f0",
                            padding: "20px",
                            textAlign:
                              "center",
                          }}
                        >
                          <img
                            src={fileUrl}
                            alt={
                              note.title
                            }
                            style={{
                              maxWidth:
                                "100%",
                              maxHeight:
                                "500px",
                              objectFit:
                                "contain",
                              borderRadius:
                                "8px",
                              backgroundColor:
                                "#ffffff",
                              border:
                                "1px solid #cbd5e1",
                            }}
                          />
                        </div>
                      )}

                      {/* OTHER FILE MESSAGE */}

                      {!isPdf &&
                        !isImage && (
                          <div
                            style={{
                              padding:
                                "25px",
                              backgroundColor:
                                "#f1f5f9",
                              textAlign:
                                "center",
                            }}
                          >
                            <div
                              style={{
                                fontSize:
                                  "42px",
                                marginBottom:
                                  "8px",
                              }}
                            >
                              {fileIcon}
                            </div>

                            <strong
                              style={{
                                color:
                                  "#334155",
                              }}
                            >
                              {fileType}
                            </strong>

                            <p
                              style={{
                                margin:
                                  "7px 0 0",
                                color:
                                  "#64748b",
                                fontSize:
                                  "14px",
                              }}
                            >
                              Preview is not available
                              in the browser. Use
                              Download to access this
                              material.
                            </p>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            )}
        </section>

        {/* =================================================
            SERVICE REQUESTS
        ================================================= */}

        <section
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "28px",
            boxShadow:
              "0 4px 12px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                }}
              >
                📩 Customer Service Requests
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#64748b",
                }}
              >
                View and manage project requirements
                submitted by customers.
              </p>
            </div>

            <button
              onClick={fetchRequests}
              style={{
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                padding: "9px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              🔄 Refresh
            </button>
          </div>

          {/* LOADING */}

          {loadingRequests && (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              Loading service requests...
            </div>
          )}

          {/* ERROR */}

          {!loadingRequests &&
            requestError && (
              <div
                style={{
                  backgroundColor:
                    "#fef2f2",
                  border:
                    "1px solid #fecaca",
                  color: "#991b1b",
                  padding: "16px",
                  borderRadius: "10px",
                }}
              >
                {requestError}
              </div>
            )}

          {/* NO REQUESTS */}

          {!loadingRequests &&
            !requestError &&
            requests.length === 0 && (
              <div
                style={{
                  padding: "35px",
                  textAlign: "center",
                  border:
                    "1px dashed #cbd5e1",
                  borderRadius: "12px",
                  color: "#64748b",
                }}
              >
                No customer service requests yet.
              </div>
            )}

          {/* REQUEST LIST */}

          {!loadingRequests &&
            !requestError &&
            requests.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gap: "20px",
                }}
              >
                {requests.map(
                  (request) => (
                    <div
                      key={request._id}
                      style={{
                        border:
                          "1px solid #e2e8f0",
                        borderRadius:
                          "12px",
                        padding: "22px",
                        backgroundColor:
                          "#f8fafc",
                      }}
                    >
                      {/* CUSTOMER HEADER */}

                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "flex-start",
                          gap: "15px",
                          flexWrap:
                            "wrap",
                          marginBottom:
                            "20px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: 0,
                              fontSize:
                                "20px",
                            }}
                          >
                            {request.name}
                          </h3>

                          <p
                            style={{
                              margin:
                                "5px 0 0",
                              color:
                                "#64748b",
                              fontSize:
                                "13px",
                            }}
                          >
                            Submitted on{" "}
                            {formatDate(
                              request.createdAt
                            )}
                          </p>
                        </div>

                        <span
                          style={{
                            ...getStatusStyle(
                              request.status
                            ),
                            padding:
                              "6px 12px",
                            borderRadius:
                              "999px",
                            fontSize:
                              "12px",
                            fontWeight:
                              "700",
                          }}
                        >
                          {
                            request.status
                          }
                        </span>
                      </div>

                      {/* CUSTOMER DETAILS */}

                      <div
                        style={{
                          display:
                            "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                          gap: "16px",
                          marginBottom:
                            "20px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize:
                                "11px",
                              fontWeight:
                                "700",
                              color:
                                "#64748b",
                              marginBottom:
                                "5px",
                            }}
                          >
                            EMAIL
                          </div>

                          <div
                            style={{
                              wordBreak:
                                "break-word",
                            }}
                          >
                            {
                              request.email
                            }
                          </div>
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize:
                                "11px",
                              fontWeight:
                                "700",
                              color:
                                "#64748b",
                              marginBottom:
                                "5px",
                            }}
                          >
                            PHONE
                          </div>

                          <div>
                            {
                              request.phone
                            }
                          </div>
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize:
                                "11px",
                              fontWeight:
                                "700",
                              color:
                                "#64748b",
                              marginBottom:
                                "5px",
                            }}
                          >
                            COMPANY
                          </div>

                          <div>
                            {request.company ||
                              "Not provided"}
                          </div>
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize:
                                "11px",
                              fontWeight:
                                "700",
                              color:
                                "#64748b",
                              marginBottom:
                                "5px",
                            }}
                          >
                            SERVICE
                          </div>

                          <div>
                            {
                              request.service
                            }
                          </div>
                        </div>
                      </div>

                      {/* DESCRIPTION */}

                      <div
                        style={{
                          marginBottom:
                            "20px",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "11px",
                            fontWeight:
                              "700",
                            color:
                              "#64748b",
                            marginBottom:
                              "7px",
                          }}
                        >
                          PROJECT DESCRIPTION
                        </div>

                        <div
                          style={{
                            backgroundColor:
                              "#ffffff",
                            border:
                              "1px solid #e2e8f0",
                            borderRadius:
                              "8px",
                            padding:
                              "14px",
                            lineHeight:
                              "1.6",
                            whiteSpace:
                              "pre-wrap",
                          }}
                        >
                          {
                            request.description
                          }
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div
                        style={{
                          display:
                            "flex",
                          gap: "10px",
                          flexWrap:
                            "wrap",
                          alignItems:
                            "center",
                        }}
                      >
                        <button
                          onClick={() =>
                            contactCustomer(
                              request
                            )
                          }
                          style={{
                            border:
                              "none",
                            backgroundColor:
                              "#2563eb",
                            color:
                              "#ffffff",
                            padding:
                              "10px 16px",
                            borderRadius:
                              "8px",
                            cursor:
                              "pointer",
                            fontWeight:
                              "600",
                          }}
                        >
                          ✉️ Contact Customer
                        </button>

                        <a
                          href={`tel:${request.phone}`}
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            textDecoration:
                              "none",
                            backgroundColor:
                              "#ffffff",
                            color:
                              "#0f172a",
                            border:
                              "1px solid #cbd5e1",
                            padding:
                              "9px 16px",
                            borderRadius:
                              "8px",
                            fontWeight:
                              "600",
                          }}
                        >
                          📞 Call
                        </a>

                        <select
                          value={
                            request.status
                          }
                          onChange={(
                            event
                          ) =>
                            updateStatus(
                              request._id,
                              event.target
                                .value
                            )
                          }
                          style={{
                            border:
                              "1px solid #cbd5e1",
                            backgroundColor:
                              "#ffffff",
                            padding:
                              "10px 12px",
                            borderRadius:
                              "8px",
                            cursor:
                              "pointer",
                            fontWeight:
                              "600",
                          }}
                        >
                          <option value="NEW">
                            NEW
                          </option>

                          <option value="CONTACTED">
                            CONTACTED
                          </option>

                          <option value="IN_PROGRESS">
                            IN PROGRESS
                          </option>

                          <option value="COMPLETED">
                            COMPLETED
                          </option>

                          <option value="CANCELLED">
                            CANCELLED
                          </option>
                        </select>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
