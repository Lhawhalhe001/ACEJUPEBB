

// "use client";
// import React, { useEffect, useState } from "react";
// import { fetchData } from "../../../utils/api";

// export default function NotesPage() {
//   const [notes, setNotes] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function loadNotes() {
//       try {
//         setLoading(true);

//         // Fetch from backend
//         const res = await fetchData("student/notes/allnotes");

//         if (!res || !Array.isArray(res.notes)) {
//           throw new Error("Invalid data format received from backend");
//         }

//         // Group notes by subject
//         const grouped = res.notes.reduce((acc, note) => {
//           if (!acc[note.subject]) acc[note.subject] = [];
//           acc[note.subject].push(note);
//           return acc;
//         }, {});

//         setNotes(grouped);
//       } catch (err) {
//         console.error("Failed to load notes:", err);
//         setError("⚠️ Could not load notes. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadNotes();
//   }, []);

//   if (loading) return <p>Loading notes...</p>;
//   if (error) return <p>{error}</p>;

//   const subjects = Object.keys(notes);

//   return (
//     <div className="container p-6">
//       <h2 className="text-2xl font-bold mb-4">📘 Notes</h2>

//       {subjects.length === 0 ? (
//         <p>No notes uploaded yet.</p>
//       ) : (
//         subjects.map((subject) => (
//           <section key={subject} className="mb-6 border-b pb-4">
//             <h3 className="text-xl font-semibold mb-2">{subject}</h3>

//             <ul className="list-disc pl-6 space-y-2">
//               {notes[subject].map((note) => (
//                 <li key={note._id}>
//                   <strong>{note.topic}</strong>
//                   <p>{note.body}</p>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         ))
//       )}
//     </div>
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../utils/api";

export default function NotesPage() {
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Load notes from backend
  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true);

        const res = await fetchData("student/notes/allnotes");

        if (!res || !Array.isArray(res.notes)) {
          throw new Error("Invalid data from backend");
        }

        // Group notes by subject
        const grouped = res.notes.reduce((acc, note) => {
          if (!acc[note.subject]) acc[note.subject] = [];
          acc[note.subject].push(note);
          return acc;
        }, {});

        setNotes(grouped);

        // Auto-select first subject
        const subjects = Object.keys(grouped);
        if (subjects.length > 0) {
          setSelectedSubject(subjects[0]);
        }
      } catch (err) {
        console.error("Failed to load notes:", err);
        setError("⚠️ Could not load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  if (loading) return <p className="p-6">Loading notes...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const subjects = Object.keys(notes);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📘 JUPEB Notes</h2>

      {/* SUBJECT SELECTOR */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => setSelectedSubject(subj)}
            className={`px-4 py-2 rounded-lg font-medium border transition-all duration-200 ${
              selectedSubject === subj
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* NOTES DISPLAY */}
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
          {selectedSubject || "Select a Subject"}
        </h3>

        {!selectedSubject || notes[selectedSubject].length === 0 ? (
          <p>No notes available for this subject.</p>
        ) : (
          <div className="space-y-5">
            {notes[selectedSubject].map((note) => (
              <div
                key={note._id}
                className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <h4 className="font-bold text-lg text-blue-700">
                  {note.topic}
                </h4>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

