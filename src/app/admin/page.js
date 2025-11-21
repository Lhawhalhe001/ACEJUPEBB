// src/app/admin/page.js
// Admin dashboard: generate student codes, upload notes, add quizzes and past questions.

// "use client";
// import React, { useState } from "react";
// import Navbar from "../../components/Navbar";
// import DashboardCard from "../../components/DashboardCard";
// import "../../styles/admin.css";
// import { postData } from "../../utils/api";

// export default function AdminDashboard() {
//   const [generatedCode, setGeneratedCode] = useState(""); // store generated code locally
//   const [uploadFile, setUploadFile] = useState(null);
//   const [message, setMessage] = useState(""); // status messages

//   const handleGenerate = async () => {
//     setMessage("");
//     // -----------------------
//     // const generatedCodes = async (req, res) => {
//   // try {
//   //   const { count } = req.body;
//   //   const Alladmins = await Admin.findOne();

//   //   if (!Alladmins) {
//   //     return res.status(404).json({ message: "Admin does not exist!" });
//   //   }

//   //   const newUniqueCodes = [];
//   //   for (let i = 0; i < count; i++) {
//   //     const randomCode = Math.random()
//   //       .toString(36)
//   //       .substring(2, 8)
//   //       .toUpperCase();
//   //     newUniqueCodes.push({ code: randomCode, used: false });
//   //   }
//     // -----------------------

//     // Frontend fallback generator (temporary)
//     const code = 'STU-' + Math.random().toString(36).slice(2, 8).toUpperCase();
//     setGeneratedCode(code);
//     setMessage('Code generated locally. Replace with backend call later.');
//   };

//   const handleFileChange = (e) => setUploadFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!uploadFile) return setMessage('Please choose a file');
//     setMessage('Uploading...');

//     // -----------------------
//     // Recommended: use a multipart/form-data POST to the backend
//     // Example:
//     // const form = new FormData();
//     // form.append('file', uploadFile);
//     // form.append('subject', 'physics');
//     // const res = await fetch(`${BASE_URL}/admin/upload-note`, { method: 'POST', body: form });
//     // -----------------------

//     setTimeout(() => setMessage('Uploaded (simulated). Connect to backend upload endpoint to store files'), 800);
//   };

//   return (
//     <div>
//       <Navbar />
//       <main className="container admin-page">
//         <h1>Admin Dashboard</h1>

//         <div className="grid">
//           <DashboardCard title="Generate Student Access Code">
//             <p>Generate a code each student can use to create/login into student account.</p>
//             <button onClick={handleGenerate}>Generate Code</button>
//             {generatedCode && <p style={{ marginTop: 8 }}><strong>Generated:</strong> {generatedCode}</p>}
//             {message && <p style={{ marginTop: 8 }}>{message}</p>}

//             <p style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
//               <strong>NOTE:</strong> When backend is ready, swap the local generator with an API call to <code>POST /admin/generate-code</code> and use the returned code.
//             </p>
//           </DashboardCard>

//           <DashboardCard title="Upload Notes & Resources">
//             <p>Upload PDF/Doc for students. Include a subject field in the upload request.</p>
//             <input type="file" onChange={handleFileChange} />
//             <div style={{ marginTop: 8 }}>
//               <button onClick={handleUpload}>Upload File</button>
//             </div>
//           </DashboardCard>

//           <DashboardCard title="Manage Quizzes & Past Questions">
//             <p>Add quizzes (questions/options/answers) and upload past question papers here.</p>
//             <button style={{ marginRight: 8 }}>Add New Quiz</button>
//             <button>Add Past Questions</button>
//           </DashboardCard>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const BASE_URL = "https://ace-jupeb-production.up.railway.app/api"; // 🔧 change to your backend base URL
  const [message, setMessage] = useState("");

  // ------------------ STATES ------------------
  const [codeCount, setCodeCount] = useState(1);
  const [generatedCodes, setGeneratedCodes] = useState([]);

  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState("Physics");
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");

  const [quizSubject, setQuizSubject] = useState("Physics");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const [pastSubject, setPastSubject] = useState("Physics");
  const [pastTopic, setPastTopic] = useState("");
  const [pastBody, setPastBody] = useState("");

  // ------------------ GENERATE CODE ------------------
  const handleGenerateCode = async () => {
    try {
      setMessage("Generating...");
      const res = await fetch(`${BASE_URL}/admin/generate-codes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: Number(codeCount) }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedCodes(data.codes || []);
        setMessage("✅ Codes generated successfully!");
      } else {
        setMessage(data.message || "Failed to generate codes.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error connecting to backend.");
    }
  };

  // ------------------ CREATE NOTE ------------------
//   const handleCreateNote = async () => {
//   try {
//     if (!subject || !topic || !body) {
//       setMessage("⚠️ Please fill in all fields!");
//       return;
//     }

//     setMessage("Uploading note...");

//     const res = await fetch(`${BASE_URL}/student/notes/createNote`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ subject, topic, body }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setNotes((prev) => [...prev, data.note]);
//       setMessage("✅ Note created successfully!");
//       setTopic("");
//       setBody("");
//     } else {
//       setMessage(data.message || "❌ Failed to create note.");
//     }
//   } catch (err) {
//     console.error("Error uploading note:", err);
//     setMessage("⚠️ Error connecting to backend.");
//   }
// };

// ------------------ CREATE NOTE ------------------
const handleCreateNote = async () => {
  try {
    if (!subject || !topic || !body) {
      setMessage("⚠️ Please fill in all fields!");
      return;
    }

    setMessage("Uploading note...");

    const res = await fetch(`${BASE_URL}/admin/createNote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, topic, body }),
    });

    // 🔥 FIX: Check if response is HTML instead of JSON
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON: ${text.substring(0, 100)}`);
    }

    if (res.ok) {
      setNotes((prev) => [...prev, data.note]);
      setMessage("✅ Note created successfully!");
      setTopic("");
      setBody("");
    } else {
      setMessage(data.message || " Failed to create note.");
    }
  } catch (err) {
    console.error("Error uploading note:", err);
    setMessage("⚠️ Error connecting to backend.");
  }
};

  // ------------------ DELETE NOTE ------------------
  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/deleteNote/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setNotes((prev) => prev.filter((n) => n._id !== id));
        setMessage("🗑️ Note deleted.");
      } else {
        setMessage(data.message || "Failed to delete note.");
      }
    } catch (err) {
      setMessage("⚠️ Error deleting notee.");
    }
  };

  // ------------------ CREATE QUIZ ------------------
  // const handleCreateQuiz = async () => {
  //   try {
  //     const res = await fetch(`${BASE_URL}admin/createQuestion`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         subject: quizSubject,
  //         question,
  //         options,
  //         answer,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setMessage("✅ Quiz added successfully!");
  //       setQuestion("");
  //       setOptions(["", "", "", ""]);
  //       setAnswer("");
  //     } else {
  //       setMessage(data.message || "Failed to add quiz.");
  //     }
  //   } catch (err) {
  //     setMessage("⚠️ Error adding quiz.");
  //   }
  // };

  const handleCreateQuiz = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/createQuestion`, { // ✅ corrected endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: quizSubject,       // ✅ same
        question,                   // ✅ same
        option: options,            // ✅ renamed "options" → "option"
        correctOption: answer,      // ✅ renamed "answer" → "correctOption"
        author: "69024750bb3dc1fd0acc78fb",            // ✅ added default author
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Quiz added successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
    } else {
      setMessage(`❌ ${data.error || data.message || "Failed to add quiz."}`);
    }
  } catch (err) {
    console.error(err);
    setMessage("⚠️ Error adding quiz. Please try again.");
  }
};

  // ------------------ UPLOAD PAST QUESTION ------------------
  const handleUploadPastQ = async () => {
    if (!pastTopic || !pastBody)
      return setMessage("Please fill in all fields before uploading.");

    try {
      setMessage("Uploading past question...");
      const res = await fetch(`${BASE_URL}/uploadPastQuestion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: pastSubject,
          topic: pastTopic,
          body: pastBody,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Past question uploaded successfully!");
        setPastTopic("");
        setPastBody("");
      } else {
        setMessage(data.message || "⚠️ Failed to upload past question.");
      }
    } catch (err) {
      setMessage("⚠️ Error uploading past question.");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container admin-page">
        <h1>Admin Dashboard</h1>

        <div className="grid">
          {/* ---------------- Generate Code Section ---------------- */}
          <div className="admin-card">
            <h2>Generate Student Access Code</h2>
            <p>Enter how many access codes to generate:</p>
            <input
              type="number"
              min="1"
              value={codeCount}
              onChange={(e) => setCodeCount(e.target.value)}
              placeholder="Number of codes"
            />
            <button onClick={handleGenerateCode}>Generate</button>

            {generatedCodes.length > 0 && (
              <ul className="codes-list">
                {generatedCodes.map((c, i) => (
                  <li key={i}>{c.code}</li>
                ))}
              </ul>
            )}
          </div>

          {/* ---------------- Upload Note Section ---------------- */}
          <div className="admin-card">
            <h2>Upload Notes</h2>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Math</option>
              <option>Biology</option>
            </select>
            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <textarea
              placeholder="Write your note here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button onClick={handleCreateNote}>Save Note</button>

            <ul className="note-list">
              {notes.map((note) => (
                <li key={note._id}>
                  <strong>{note.topic}</strong> — {note.subject}
                  <button onClick={() => handleDeleteNote(note._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- Upload Quiz Section ---------------- */}
          <div className="admin-card">
  <h2>Add New Quiz</h2>
  <select
    value={quizSubject}
    onChange={(e) => setQuizSubject(e.target.value)}
  >
    <option value="">-- Select Subject --</option>
    <option value="Physics">Physics</option>
    <option value="Chemistry">Chemistry</option>
    <option value="Math">Math</option>
    <option value="Biology">Biology</option>
  </select>

  <input
    type="text"
    placeholder="Question"
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
  />

  {options.map((opt, i) => (
    <input
      key={i}
      type="text"
      placeholder={`Option ${i + 1}`}
      value={opt}
      onChange={(e) =>
        setOptions(
          options.map((o, index) =>
            index === i ? e.target.value : o
          )
        )
      }
    />
  ))}

  <input
    type="text"
    placeholder="Correct Answer"
    value={answer}
    onChange={(e) => setAnswer(e.target.value)}
  />

  <button
    onClick={() => {
      if (
        !quizSubject ||
        !question ||
        options.every((opt) => opt.trim() === "") ||
        !answer
      ) {
        setMessage("⚠️ Please fill all fields before uploading.");
        return;
      }

      handleCreateQuiz();
    }}
  >
    Upload Quiz
  </button>
</div>

          {/* ---------------- Upload Past Questions Section ---------------- */}
          <div className="admin-card">
            <h2>Upload Past Questions</h2>

            <select
              value={pastSubject}
              onChange={(e) => setPastSubject(e.target.value)}
            >
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Math</option>
              <option>Biology</option>
            </select>

            <input
              type="text"
              placeholder="Topic"
              value={pastTopic}
              onChange={(e) => setPastTopic(e.target.value)}
            />

            <textarea
              placeholder="Type the past question content here..."
              value={pastBody}
              onChange={(e) => setPastBody(e.target.value)}
            ></textarea>

            <button onClick={handleUploadPastQ}>Save Past Question</button>
          </div>
        </div>

        {message && <p className="status">{message}</p>}
      </main>
    </div>
  );
}
