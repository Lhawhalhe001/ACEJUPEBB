

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
  const [searchQuery, setSearchQuery] = useState("");

  // Map English → Biology
  const subjectMap = {
    English: "Biology",
  };

  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true);

        const res = await fetchData("student/notes/allnotes");

        if (!res || !Array.isArray(res.notes)) {
          throw new Error("Invalid data format received from backend");
        }

        // Group notes by REAL subjects
        const grouped = res.notes.reduce((acc, note) => {
          const realSubj = note.subject;
          if (!acc[realSubj]) acc[realSubj] = [];
          acc[realSubj].push(note);
          return acc;
        }, {});

        setNotes(grouped);
      } catch (err) {
        console.error("Failed to load notes:", err);
        setError("⚠️ Could not load notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  if (loading) return <p className="p-4">Loading notes...</p>;
  if (error) return <p className="p-4">{error}</p>;

  // Convert English → Biology in UI
  const subjects = Object.keys(notes).map(
    (subj) => subjectMap[subj] || subj
  );

  // Resolve selected subject back to original backend subject
  const backendSubject = Object.keys(notes).find(
    (key) => subjectMap[key] === selectedSubject || key === selectedSubject
  );

  // Notes for selected subject
  const filteredNotes =
    backendSubject && notes[backendSubject]
      ? notes[backendSubject].filter(
          (note) =>
            note.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.body.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <div className="container p-6">
      {/* Page Header */}
      <h2 className="text-3xl font-bold mb-6">📘 JUPEB Notes</h2>

      {/* Subject Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`p-4 rounded-xl shadow 
              border transition-all
              ${
                selectedSubject === subject
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* If subject not selected */}
      {!selectedSubject && (
        <p className="text-gray-500 text-lg">
          👉 Select a subject to view notes.
        </p>
      )}

      {/* Subject Title + Search Bar */}
      {selectedSubject && (
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-3">
            {selectedSubject} Notes
          </h3>

          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm mb-4 
            outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            className="p-4 border rounded-xl shadow bg-white"
          >
            <h4 className="font-semibold text-xl mb-1">{note.topic}</h4>
            <p className="text-gray-700">{note.body}</p>
          </div>
        ))}

        {selectedSubject && filteredNotes.length === 0 && (
          <p className="text-gray-500">No notes found.</p>
        )}
      </div>
    </div>
  );
}
