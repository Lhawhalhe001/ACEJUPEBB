
// "use client";
// import React, { useState, useEffect } from "react";

// const BASE_URL = "http://localhost:5000/api"; // ✅ must match your backend

// export default function QuizPage() {
//   const [subject, setSubject] = useState("Biology"); // default to match DB
//   const [questions, setQuestions] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [finished, setFinished] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // 🧠 Fetch quizzes from backend
//   const fetchQuizzes = async (subj) => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch(`${BASE_URL}/student/pq/quiz`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch quizzes (status ${res.status})`);
//       }

//       const data = await res.json();
//       console.log("Quiz response:", data);

//       const allQuizzes = data.questions || [];

//       // Extract array if wrapped
//       // const allQuizzes = Array.isArray(data) ? data : data.quizzes || [];

//       // Filter by subject
//       const filtered = allQuizzes.filter(
//         (q) => q.subject.toLowerCase() === subj.toLowerCase()
//       );

//       if (filtered.length === 0) {
//         setMessage(`⚠️ No quiz available yet for ${subj}.`);
//       }

//       setQuestions(filtered);
//       setIndex(0);
//       setScore(0);
//       setFinished(false);
//     } catch (err) {
//       console.error("Error fetching quizzes:", err);
//       setMessage("⚠️ Error loading quizzes. Please try again.");
//       setQuestions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch quizzes on subject change
//   useEffect(() => {
//     fetchQuizzes(subject);
//   }, [subject]);

//   const handleAnswer = (opt) => {
//     const current = questions[index];
//     if (opt === current.correctOption) setScore((s) => s + 1);

//     if (index + 1 < questions.length) setIndex(index + 1);
//     else setFinished(true);
//   };

//   const handleTryAgain = () => {
//     fetchQuizzes(subject);
//   };

//   return (
//     <div
//       className="container"
//       style={{ maxWidth: 600, margin: "auto", padding: 20 }}
//     >
//       <h2>JUPEB Quiz Practice</h2>

//       <div style={{ marginBottom: 16 }}>
//         <label>Choose subject: </label>
//         <select value={subject} onChange={(e) => setSubject(e.target.value)}>
//           <option value="Physics">Physics</option>
//           <option value="Chemistry">Chemistry</option>
//           <option value="Math">Math</option>
//           <option value="Biology">Biology</option>
//         </select>
//       </div>

//       {loading && <p>Loading questions...</p>}
//       {message && <p>{message}</p>}

//       {!loading && !finished && questions.length > 0 && (
//         <div>
//           <p>
//             <strong>Q{index + 1}:</strong> {questions[index].question}
//           </p>
//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {Array.isArray(questions[index].option) &&
//               questions[index].option.map((opt, i) => (
//                 <button
//                   key={i}
//                   onClick={() => handleAnswer(opt)}
//                   style={{
//                     padding: 10,
//                     borderRadius: 6,
//                     border: "1px solid #ccc",
//                     background: "#f9f9f9",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {opt}
//                 </button>
//               ))}
//           </div>
//         </div>
//       )}

//       {finished && (
//         <div>
//           <p>
//             🎉 Finished! Your score: <strong>{score}</strong> /{" "}
//             {questions.length}
//           </p>
//           <button onClick={handleTryAgain}>Try Again</button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/student.css";

const BASE_URL = "https://ace-jupeb.onrender.com/api";

export default function QuizPage() {
  const [subject, setSubject] = useState("Biology");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchQuizzes = async (subj) => {
    setLoading(true);
    setMessage("");
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setFinished(false);

    try {
      const res = await fetch(`${BASE_URL}/student/pq/quiz`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch quizzes");

      const data = await res.json();
      console.log("Fetched data:", data); // ✅ log for debugging

      const allQuizzes = data.questions || [];
      const filtered = allQuizzes.filter(
        (q) => q.subject.toLowerCase() === subj.toLowerCase()
      );

      if (filtered.length === 0) {
        setMessage(`⚠️ No quiz available for ${subj}.`);
      }

      setQuestions(filtered);
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error loading quizzes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes(subject);
  }, [subject]);

  const handleAnswer = (opt) => {
    const current = questions[index];
    if (opt === current.correctOption) setScore((s) => s + 1);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const handleTryAgain = () => {
    fetchQuizzes(subject);
  };

  return (
    <div>
      <Navbar />

      <main className="container" style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
        <h2>JUPEB Quiz Practice</h2>

        {/* Subject selection */}
        <div style={{ marginBottom: 16 }}>
          <label>Choose subject: </label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Math">Math</option>
            <option value="Biology">Biology</option>
          </select>
        </div>

        {/* Loading & messages */}
        {loading && <p>Loading questions...</p>}
        {message && <p>{message}</p>}

        {/* Quiz questions */}
        {!loading && !finished && questions.length > 0 && (
          <div>
            <p>
              <strong>Q{index + 1}:</strong> {questions[index].question}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {questions[index].option?.length > 0 ? (
                questions[index].option.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    className="quiz-option"
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      border: "1px solid #ddd",
                      background: "white",
                      cursor: "pointer",
                      transition: "0.2s ease",
                      color: " #206cc9ff"
                    }}
                  >
                    {opt}
                  </button>
                ))
              ) : (
                <p>No options available for this question.</p>
              )}
            </div>
          </div>
        )}

        {/* Finished screen */}
        {finished && (
          <div>
            <p>
              🎉 Finished! Your score: <strong>{score}</strong> / {questions.length}
            </p>
            <button onClick={handleTryAgain} className="try-again-btn">
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
