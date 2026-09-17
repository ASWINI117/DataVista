import { useEffect, useState } from "react";

function FreeNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        return response.json();
      })
      .then((data) => {
        setNotes(data.notes || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load notes");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h1>Free Notes</h1>
        <p>Loading learning materials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Free Notes</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Free Notes</h1>

      <p>
        Learn Data Analytics with structured notes and practical resources.
      </p>

      {notes.length === 0 ? (
        <p>No learning materials available yet.</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h2>{note.title}</h2>

              <p>
                <strong>Topic:</strong> {note.topic}
              </p>

              {note.description && <p>{note.description}</p>}

              <div className="note-actions">
                <a
                  href={`http://localhost:5000${note.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Note
                </a>

                <a
                  href={`http://localhost:5000${note.filePath}`}
                  download={note.originalName}
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FreeNotes;
