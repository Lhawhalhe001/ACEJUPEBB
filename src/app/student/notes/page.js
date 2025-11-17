// src/app/student/notes/page.js
// Notes list page showing the 4 subjects and listing resources per subject

// "use client";
// import React, { useEffect, useState } from "react";
// import { fetchData } from "../../../utils/api";

// export default function NotesPage() {
//   const subjects = ["Mathematics", "Physics", "Chemistry", "Biology"];
//   const [notes, setNotes] = useState({});

//   useEffect(() => {
//     async function load() {
//       // -------------------------
//       // Example API usage (updated to match backend '/api/student/notes/allnotes'):
//       const data = await fetchData('student/notes/allnotes');
//       // Expect data format: { Mathematics: [{id, title, url}], Physics: [...], ... }
//       // -------------------------

//       // Local demo data until backend is connected
//       // const demo = {
//       //   Mathematics: [{ id: 1, title: 'Algebra basics', url: '/sample-notes/algebra.pdf' }],
//       //   Physics: [{ id: 2, title: 'Mechanics notes', url: '/sample-notes/mechanics.pdf' }],
//       //   Chemistry: [{ id: 3, title: 'Organic introduction', url: '/sample-notes/organic.pdf' }],
//       //   Biology: [{ id: 4, title: 'Cell biology', url: '/sample-notes/cell.pdf' }],
//       // };
//       setNotes(data);
//     }
//     load();
//   }, []);

//   return (
//     <div className="container">
//       <h2>Notes</h2>
//       {subjects.map((s) => (
//         <section key={s} style={{ marginBottom: 20 }}>
//           <h3>{s}</h3>
//           <ul>
//             {(notes[s] || []).map((n) => (
//               <li key={n.id}>
//                 <a href={n.url} target="_blank" rel="noreferrer">{n.title}</a>
//               </li>
//             ))}
//           </ul>
//         </section>
//       ))}
//     </div>
//   );
// }

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
//         const data = await fetchData("student/notes"); // ✅ Correct endpoint

//         if (!data || !Array.isArray(data)) {
//           throw new Error("Invalid data format from backend");
//         }

//         // Group notes by subject (e.g. Physics → [notes])
//         const grouped = data.reduce((acc, note) => {
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
//             <ul className="list-disc pl-6 space-y-1">
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

  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true);

        // Fetch from backend
        const res = await fetchData("student/notes/allnotes");

        if (!res || !Array.isArray(res.notes)) {
          throw new Error("Invalid data format received from backend");
        }

        // Group notes by subject
        const grouped = res.notes.reduce((acc, note) => {
          if (!acc[note.subject]) acc[note.subject] = [];
          acc[note.subject].push(note);
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

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p>{error}</p>;

  const subjects = Object.keys(notes);

  return (
    <div className="container p-6">
      <h2 className="text-2xl font-bold mb-4">📘 Notes</h2>

      {subjects.length === 0 ? (
        <p>No notes uploaded yet.</p>
      ) : (
        subjects.map((subject) => (
          <section key={subject} className="mb-6 border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">{subject}</h3>

            <ul className="list-disc pl-6 space-y-2">
              {notes[subject].map((note) => (
                <li key={note._id}>
                  <strong>{note.topic}</strong>
                  <p>{note.body}</p>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
