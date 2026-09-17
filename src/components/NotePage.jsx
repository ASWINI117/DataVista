import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

const topicMap = {
  "data-analytics": "Data Analytics",
  "python-data-analytics": "Python for Data Analytics",
  pandas: "Pandas",
  sql: "SQL",
  excel: "Excel",
  statistics: "Statistics",
  "power-bi": "Power BI",
  "data-visualization": "Data Visualization",
  "data-analyst-interview-questions":
    "Data Analyst Interview Questions",
};

function NotePage() {
  const { slug } = useParams();

  const topic = topicMap[slug];

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        if (!topic) {
          setNotes([]);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/api/notes?topic=${encodeURIComponent(
            topic
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();

        if (data.success) {
          setNotes(data.notes || []);
        } else {
          setError(data.message || "Failed to load notes");
        }
      } catch (error) {
        console.error("Fetch notes error:", error);
        setError("Unable to load learning material.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [topic]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/free-notes"
          style={{
            textDecoration: "none",
            color: "#2563eb",
            fontWeight: "600",
          }}
        >
          ← Back to Free Notes
        </Link>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "35px",
            marginTop: "25px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            🗃️
          </div>

          <p
            style={{
              margin: "0 0 8px",
              color: "#2563eb",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            DATAVISTA FREE NOTES
          </p>

          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "36px",
            }}
          >
            {topic || "Learning Material"}
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            Learn {topic || "this topic"} with DataVista
            learning materials.
          </p>
        </div>

        {loading && (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "40px",
              borderRadius: "14px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
              color: "#64748b",
            }}
          >
            Loading learning materials...
          </div>
        )}

        {!loading && error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          notes.length === 0 && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px dashed #cbd5e1",
                borderRadius: "14px",
                padding: "50px 30px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "45px",
                  marginBottom: "15px",
                }}
              >
                📄
              </div>

              <h2
                style={{
                  margin: "0 0 10px",
                }}
              >
                Material not uploaded yet
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                }}
              >
                DataVista will add learning material for{" "}
                {topic || "this topic"} soon.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          notes.length > 0 && (
            <div
              style={{
                display: "grid",
                gap: "25px",
              }}
            >
              {notes.map((note) => {
                const pdfUrl = `${API_BASE_URL}${note.filePath}`;

                return (
                  <div
                    key={note._id}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "25px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: "#dbeafe",
                          color: "#1d4ed8",
                          padding: "6px 12px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "700",
                          marginBottom: "12px",
                        }}
                      >
                        {note.topic}
                      </span>

                      <h2
                        style={{
                          margin: "0 0 10px",
                          fontSize: "24px",
                        }}
                      >
                        {note.title}
                      </h2>

                      {note.description && (
                        <p
                          style={{
                            margin: "0 0 10px",
                            color: "#64748b",
                            lineHeight: "1.6",
                          }}
                        >
                          {note.description}
                        </p>
                      )}

                      <p
                        style={{
                          margin: "0 0 20px",
                          color: "#64748b",
                          fontSize: "13px",
                        }}
                      >
                        📄 {note.originalName}
                      </p>

                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          padding: "10px 18px",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontWeight: "600",
                        }}
                      >
                        📖 Open PDF
                      </a>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#e2e8f0",
                        padding: "15px",
                      }}
                    >
                      <iframe
                        src={pdfUrl}
                        title={note.title}
                        style={{
                          width: "100%",
                          height: "650px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "8px",
                          backgroundColor: "#ffffff",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}

export default NotePage;