
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

const categories = [
  {
    name: "Data Analytics",
    icon: "📊",
    description:
      "Learn how to analyze data and turn raw information into useful insights.",
  },
  {
    name: "Python for Data Analytics",
    icon: "🐍",
    description:
      "Build practical Python skills for data analysis and automation.",
  },
  {
    name: "Pandas",
    icon: "🐼",
    description:
      "Learn data cleaning, transformation and analysis using Pandas.",
  },
  {
    name: "SQL",
    icon: "🗄️",
    description:
      "Learn SQL from database fundamentals to advanced data analysis.",
  },
  {
    name: "Excel",
    icon: "📗",
    description:
      "Master Excel formulas, analysis, dashboards and data cleaning.",
  },
  {
    name: "Statistics",
    icon: "📈",
    description:
      "Understand the statistics concepts required for data analysis.",
  },
  {
    name: "Power BI",
    icon: "⚡",
    description:
      "Learn Power BI dashboards, reports, visuals and business insights.",
  },
  {
    name: "Data Visualization",
    icon: "📉",
    description:
      "Learn how to communicate data clearly through effective visuals.",
  },
  {
    name: "Data Analyst Interview Questions",
    icon: "💼",
    description:
      "Practice important questions for data analyst interviews.",
  },
];

function FreeNotes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH NOTES
  // =====================================================

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/notes`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch learning materials");
      }

      const data = await response.json();

      if (data.success) {
        setNotes(data.notes || []);
      } else {
        setError(
          data.message ||
            "Unable to load learning materials."
        );
      }
    } catch (err) {
      console.error("Fetch notes error:", err);

      setError(
        "Unable to connect to DataVista server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // =====================================================
  // FILE HELPERS
  // =====================================================

  const getExtension = (fileName = "") => {
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

  const getFileType = (extension) => {
    const types = {
      pdf: "PDF",
      doc: "Word",
      docx: "Word",
      xls: "Excel",
      xlsx: "Excel",
      ppt: "PowerPoint",
      pptx: "PowerPoint",
      csv: "CSV",
      txt: "Text",
      md: "Markdown",
      json: "JSON",
      jpg: "Image",
      jpeg: "Image",
      png: "Image",
      webp: "Image",
      zip: "ZIP",
      rar: "RAR",
    };

    return types[extension] || "File";
  };

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "Size unavailable";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  };

  const openFile = (note) => {
    const fileUrl =
      `${API_BASE_URL}${note.filePath}`;

    window.open(
      fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const downloadFile = (note) => {
    const fileUrl =
      `${API_BASE_URL}${note.filePath}`;

    const link = document.createElement("a");

    link.href = fileUrl;
    link.download =
      note.originalName ||
      note.fileName;

    link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =====================================================
  // FILTER NOTES
  // =====================================================

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const categoryMatch =
        selectedCategory === "All" ||
        note.topic === selectedCategory;

      const search =
        searchTerm.trim().toLowerCase();

      const searchMatch =
        !search ||
        note.title
          ?.toLowerCase()
          .includes(search) ||
        note.description
          ?.toLowerCase()
          .includes(search) ||
        note.topic
          ?.toLowerCase()
          .includes(search) ||
        note.originalName
          ?.toLowerCase()
          .includes(search);

      return categoryMatch && searchMatch;
    });
  }, [
    notes,
    selectedCategory,
    searchTerm,
  ]);

  // =====================================================
  // CATEGORY COUNTS
  // =====================================================

  const getCategoryCount = (categoryName) => {
    return notes.filter(
      (note) =>
        note.topic === categoryName
    ).length;
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily:
          "Arial, Helvetica, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* =================================================
          HERO
      ================================================= */}

      <section
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
          color: "#ffffff",
          padding:
            "80px 20px 90px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display:
                "inline-block",
              backgroundColor:
                "rgba(255,255,255,0.12)",
              border:
                "1px solid rgba(255,255,255,0.2)",
              padding:
                "7px 14px",
              borderRadius:
                "999px",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom:
                "18px",
            }}
          >
            📚 DATAVISTA LEARNING HUB
          </div>

          <h1
            style={{
              margin: "0 0 16px",
              fontSize:
                "clamp(34px, 6vw, 58px)",
              lineHeight: "1.1",
              fontWeight: "800",
            }}
          >
            Free Data Analytics Notes
          </h1>

          <p
            style={{
              margin:
                "0 auto 28px",
              maxWidth: "700px",
              fontSize: "18px",
              lineHeight: "1.7",
              color:
                "rgba(255,255,255,0.85)",
            }}
          >
            Learn data analytics with practical
            notes, guides and learning materials
            from DataVista.
          </p>

          {/* SEARCH */}

          <div
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search notes, topics or files..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding:
                  "16px 20px",
                borderRadius:
                  "12px",
                border: "none",
                outline: "none",
                fontSize: "16px",
                color: "#0f172a",
                boxShadow:
                  "0 15px 35px rgba(0,0,0,0.18)",
              }}
            />
          </div>
        </div>
      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding:
            "50px 20px 80px",
        }}
      >
        {/* =================================================
            CATEGORY SECTION
        ================================================= */}

        <section>
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "flex-end",
              gap: "20px",
              flexWrap:
                "wrap",
              marginBottom:
                "24px",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 6px",
                  color: "#2563eb",
                  fontWeight: "700",
                  fontSize: "13px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.08em",
                }}
              >
                Explore Topics
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                Learn by Category
              </h2>
            </div>

            <div
              style={{
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              {notes.length} learning material
              {notes.length !== 1
                ? "s"
                : ""}{" "}
              available
            </div>
          </div>

          {/* CATEGORY CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom:
                "55px",
            }}
          >
            {/* ALL */}

            <button
              onClick={() =>
                setSelectedCategory(
                  "All"
                )
              }
              style={{
                textAlign: "left",
                border:
                  selectedCategory ===
                  "All"
                    ? "2px solid #2563eb"
                    : "1px solid #e2e8f0",
                backgroundColor:
                  selectedCategory ===
                  "All"
                    ? "#eff6ff"
                    : "#ffffff",
                borderRadius:
                  "14px",
                padding:
                  "20px",
                cursor:
                  "pointer",
                transition:
                  "0.2s",
                boxShadow:
                  selectedCategory ===
                  "All"
                    ? "0 8px 25px rgba(37,99,235,0.12)"
                    : "0 3px 10px rgba(15,23,42,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom:
                    "12px",
                }}
              >
                🌐
              </div>

              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  gap: "10px",
                }}
              >
                <strong
                  style={{
                    fontSize:
                      "16px",
                  }}
                >
                  All Materials
                </strong>

                <span
                  style={{
                    backgroundColor:
                      "#dbeafe",
                    color:
                      "#1d4ed8",
                    padding:
                      "3px 8px",
                    borderRadius:
                      "999px",
                    fontSize:
                      "12px",
                    fontWeight:
                      "700",
                  }}
                >
                  {notes.length}
                </span>
              </div>

              <p
                style={{
                  margin:
                    "8px 0 0",
                  color:
                    "#64748b",
                  fontSize:
                    "13px",
                  lineHeight:
                    "1.5",
                }}
              >
                Browse everything available in
                the DataVista learning library.
              </p>
            </button>

            {categories.map(
              (category) => {
                const count =
                  getCategoryCount(
                    category.name
                  );

                const active =
                  selectedCategory ===
                  category.name;

                return (
                  <button
                    key={
                      category.name
                    }
                    onClick={() =>
                      setSelectedCategory(
                        category.name
                      )
                    }
                    style={{
                      textAlign:
                        "left",
                      border:
                        active
                          ? "2px solid #2563eb"
                          : "1px solid #e2e8f0",
                      backgroundColor:
                        active
                          ? "#eff6ff"
                          : "#ffffff",
                      borderRadius:
                        "14px",
                      padding:
                        "20px",
                      cursor:
                        "pointer",
                      transition:
                        "0.2s",
                      boxShadow:
                        active
                          ? "0 8px 25px rgba(37,99,235,0.12)"
                          : "0 3px 10px rgba(15,23,42,0.04)",
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          "30px",
                        marginBottom:
                          "12px",
                      }}
                    >
                      {
                        category.icon
                      }
                    </div>

                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        gap:
                          "10px",
                        alignItems:
                          "flex-start",
                      }}
                    >
                      <strong
                        style={{
                          fontSize:
                            "16px",
                        }}
                      >
                        {
                          category.name
                        }
                      </strong>

                      <span
                        style={{
                          flexShrink:
                            0,
                          backgroundColor:
                            count >
                            0
                              ? "#dcfce7"
                              : "#f1f5f9",
                          color:
                            count >
                            0
                              ? "#166534"
                              : "#64748b",
                          padding:
                            "3px 8px",
                          borderRadius:
                            "999px",
                          fontSize:
                            "12px",
                          fontWeight:
                            "700",
                        }}
                      >
                        {count}
                      </span>
                    </div>

                    <p
                      style={{
                        margin:
                          "8px 0 0",
                        color:
                          "#64748b",
                        fontSize:
                          "13px",
                        lineHeight:
                          "1.5",
                      }}
                    >
                      {
                        category.description
                      }
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </section>

        {/* =================================================
            MATERIALS
        ================================================= */}

        <section>
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              gap: "15px",
              flexWrap:
                "wrap",
              marginBottom:
                "24px",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 6px",
                  color: "#2563eb",
                  fontWeight: "700",
                  fontSize: "13px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.08em",
                }}
              >
                Learning Library
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                {selectedCategory ===
                "All"
                  ? "All Learning Materials"
                  : selectedCategory}
              </h2>
            </div>

            <button
              onClick={fetchNotes}
              style={{
                border:
                  "1px solid #cbd5e1",
                backgroundColor:
                  "#ffffff",
                color:
                  "#0f172a",
                padding:
                  "9px 15px",
                borderRadius:
                  "8px",
                cursor:
                  "pointer",
                fontWeight:
                  "600",
              }}
            >
              🔄 Refresh
            </button>
          </div>

          {/* LOADING */}

          {loading && (
            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      height:
                        "260px",
                      borderRadius:
                        "16px",
                      backgroundColor:
                        "#e2e8f0",
                    }}
                  />
                )
              )}
            </div>
          )}

          {/* ERROR */}

          {!loading &&
            error && (
              <div
                style={{
                  backgroundColor:
                    "#fef2f2",
                  border:
                    "1px solid #fecaca",
                  color:
                    "#991b1b",
                  padding:
                    "18px",
                  borderRadius:
                    "12px",
                }}
              >
                {error}

                <button
                  onClick={
                    fetchNotes
                  }
                  style={{
                    marginLeft:
                      "10px",
                    border:
                      "none",
                    background:
                      "transparent",
                    color:
                      "#2563eb",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                >
                  Try again
                </button>
              </div>
            )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredNotes.length ===
              0 && (
              <div
                style={{
                  backgroundColor:
                    "#ffffff",
                  border:
                    "1px dashed #cbd5e1",
                  borderRadius:
                    "16px",
                  padding:
                    "60px 25px",
                  textAlign:
                    "center",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "50px",
                    marginBottom:
                      "12px",
                  }}
                >
                  🔍
                </div>

                <h3
                  style={{
                    margin:
                      "0 0 8px",
                  }}
                >
                  No materials found
                </h3>

                <p
                  style={{
                    margin: 0,
                    color:
                      "#64748b",
                  }}
                >
                  Try another search or select a
                  different category.
                </p>
              </div>
            )}

          {/* MATERIAL CARDS */}

          {!loading &&
            !error &&
            filteredNotes.length >
              0 && (
              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "22px",
                }}
              >
                {filteredNotes.map(
                  (note) => {
                    const extension =
                      getExtension(
                        note.originalName
                      );

                    const icon =
                      getFileIcon(
                        extension
                      );

                    const fileType =
                      note.fileType ||
                      getFileType(
                        extension
                      );

                    const fileUrl =
                      `${API_BASE_URL}${note.filePath}`;

                    const isPdf =
                      extension ===
                      "pdf";

                    const isImage =
                      [
                        "jpg",
                        "jpeg",
                        "png",
                        "webp",
                      ].includes(
                        extension
                      );

                    return (
                      <article
                        key={
                          note._id
                        }
                        style={{
                          backgroundColor:
                            "#ffffff",
                          border:
                            "1px solid #e2e8f0",
                          borderRadius:
                            "16px",
                          overflow:
                            "hidden",
                          boxShadow:
                            "0 6px 20px rgba(15,23,42,0.06)",
                          transition:
                            "0.2s",
                        }}
                      >
                        {/* CARD TOP */}

                        <div
                          style={{
                            padding:
                              "22px",
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              justifyContent:
                                "space-between",
                              alignItems:
                                "flex-start",
                              gap:
                                "15px",
                              marginBottom:
                                "18px",
                            }}
                          >
                            <div
                              style={{
                                width:
                                  "58px",
                                height:
                                  "58px",
                                borderRadius:
                                  "14px",
                                backgroundColor:
                                  "#eff6ff",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                fontSize:
                                  "30px",
                                flexShrink:
                                  0,
                              }}
                            >
                              {
                                icon
                              }
                            </div>

                            <span
                              style={{
                                backgroundColor:
                                  "#f1f5f9",
                                color:
                                  "#475569",
                                padding:
                                  "5px 9px",
                                borderRadius:
                                  "999px",
                                fontSize:
                                  "11px",
                                fontWeight:
                                  "700",
                              }}
                            >
                              {
                                fileType
                              }
                            </span>
                          </div>

                          {/* TOPIC */}

                          <span
                            style={{
                              display:
                                "inline-block",
                              backgroundColor:
                                "#dbeafe",
                              color:
                                "#1d4ed8",
                              padding:
                                "5px 10px",
                              borderRadius:
                                "999px",
                              fontSize:
                                "11px",
                              fontWeight:
                                "700",
                              marginBottom:
                                "10px",
                            }}
                          >
                            {
                              note.topic
                            }
                          </span>

                          <h3
                            style={{
                              margin:
                                "0 0 10px",
                              fontSize:
                                "19px",
                              lineHeight:
                                "1.35",
                              color:
                                "#0f172a",
                            }}
                          >
                            {
                              note.title
                            }
                          </h3>

                          <p
                            style={{
                              margin:
                                "0 0 18px",
                              color:
                                "#64748b",
                              fontSize:
                                "14px",
                              lineHeight:
                                "1.6",
                              minHeight:
                                "45px",
                            }}
                          >
                            {note.description ||
                              "Practical learning material from the DataVista learning library."}
                          </p>

                          {/* FILE INFO */}

                          <div
                            style={{
                              borderTop:
                                "1px solid #e2e8f0",
                              paddingTop:
                                "14px",
                              color:
                                "#64748b",
                              fontSize:
                                "12px",
                              lineHeight:
                                "1.6",
                              marginBottom:
                                "18px",
                            }}
                          >
                            <div
                              style={{
                                wordBreak:
                                  "break-word",
                                fontWeight:
                                  "600",
                                color:
                                  "#475569",
                                marginBottom:
                                  "3px",
                              }}
                            >
                              {icon}{" "}
                              {
                                note.originalName
                              }
                            </div>

                            <div>
                              {formatFileSize(
                                note.fileSize
                              )}
                              {" • "}
                              .
                              {extension ||
                                "file"}
                            </div>
                          </div>

                          {/* BUTTONS */}

                          <div
                            style={{
                              display:
                                "flex",
                              gap:
                                "9px",
                              flexWrap:
                                "wrap",
                            }}
                          >
                            <button
                              onClick={() =>
                                openFile(
                                  note
                                )
                              }
                              style={{
                                flex:
                                  "1 1 130px",
                                border:
                                  "none",
                                backgroundColor:
                                  "#2563eb",
                                color:
                                  "#ffffff",
                                padding:
                                  "11px 14px",
                                borderRadius:
                                  "9px",
                                cursor:
                                  "pointer",
                                fontWeight:
                                  "700",
                              }}
                            >
                              {isPdf
                                ? "📖 Open PDF"
                                : isImage
                                ? "🖼️ Open"
                                : "👁️ Open"}
                            </button>

                            <button
                              onClick={() =>
                                downloadFile(
                                  note
                                )
                              }
                              style={{
                                flex:
                                  "1 1 120px",
                                border:
                                  "1px solid #cbd5e1",
                                backgroundColor:
                                  "#ffffff",
                                color:
                                  "#0f172a",
                                padding:
                                  "11px 14px",
                                borderRadius:
                                  "9px",
                                cursor:
                                  "pointer",
                                fontWeight:
                                  "700",
                              }}
                            >
                              ⬇️ Download
                            </button>
                          </div>
                        </div>

                        {/* PDF PREVIEW */}

                        {isPdf && (
                          <div
                            style={{
                              backgroundColor:
                                "#f1f5f9",
                              padding:
                                "12px",
                              borderTop:
                                "1px solid #e2e8f0",
                            }}
                          >
                            <iframe
                              src={
                                fileUrl
                              }
                              title={
                                note.title
                              }
                              style={{
                                width:
                                  "100%",
                                height:
                                  "280px",
                                border:
                                  "1px solid #cbd5e1",
                                borderRadius:
                                  "9px",
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
                                "#f1f5f9",
                              padding:
                                "15px",
                              borderTop:
                                "1px solid #e2e8f0",
                              textAlign:
                                "center",
                            }}
                          >
                            <img
                              src={
                                fileUrl
                              }
                              alt={
                                note.title
                              }
                              style={{
                                width:
                                  "100%",
                                height:
                                  "240px",
                                objectFit:
                                  "contain",
                                backgroundColor:
                                  "#ffffff",
                                borderRadius:
                                  "9px",
                              }}
                            />
                          </div>
                        )}
                      </article>
                    );
                  }
                )}
              </div>
            )}
        </section>

        {/* =================================================
            CTA
        ================================================= */}

        <section
          style={{
            marginTop:
              "65px",
            background:
              "linear-gradient(135deg, #eff6ff, #ffffff)",
            border:
              "1px solid #dbeafe",
            borderRadius:
              "18px",
            padding:
              "35px 25px",
            textAlign:
              "center",
          }}
        >
          <div
            style={{
              fontSize:
                "36px",
              marginBottom:
                "10px",
            }}
          >
            🚀
          </div>

          <h2
            style={{
              margin:
                "0 0 10px",
              fontSize:
                "26px",
            }}
          >
            Ready to build your data skills?
          </h2>

          <p
            style={{
              margin:
                "0 auto 20px",
              maxWidth:
                "650px",
              color:
                "#64748b",
              lineHeight:
                "1.6",
            }}
          >
            Explore more DataVista resources and
            start building practical skills in
            SQL, Excel, Python, Power BI and data
            analytics.
          </p>

          <button
            onClick={() =>
              navigate("/")
            }
            style={{
              border:
                "none",
              backgroundColor:
                "#0f172a",
              color:
                "#ffffff",
              padding:
                "12px 22px",
              borderRadius:
                "9px",
              cursor:
                "pointer",
              fontWeight:
                "700",
            }}
          >
            ← Back to DataVista
          </button>
        </section>
      </main>
    </div>
  );
}

export default FreeNotes;
