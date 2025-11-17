// // src/app/student/quiz/page.js
// // Simple quiz chooser: choose subject then start a small demo quiz

// "use client";
// import React, { useState } from "react";

// const demoQuestions = {
//   Mathematics: [
//     { q: 'What is 2 + 2?', options: ['3','4','5'], answer: 1 },
//   ],
//   Physics: [
//     { q: 'Unit of force?', options: ['Joule','Newton','Watt'], answer: 1 },
//   ],
//   Chemistry: [
//     { q: 'pH < 7 means?', options: ['Basic','Acidic','Neutral'], answer: 1 },
//   ],
//   Biology: [
//     { q: 'Basic unit of life?', options: ['Atom','Cell','Organ'], answer: 1 },
//   ],
// };

// export default function QuizPage() {
//   const [subject, setSubject] = useState('Mathematics');
//   const [index, setIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [finished, setFinished] = useState(false);

//   const questions = demoQuestions[subject];

//   const handleAnswer = (i) => {
//     if (i === questions[index].answer) setScore((s) => s + 1);
//     if (index + 1 < questions.length) setIndex(index + 1);
//     else setFinished(true);
//   };

//   return (
//     <div className="container">
//       <h2>Quizzes</h2>
//       <div style={{ marginBottom: 12 }}>
//         <label>Choose subject:</label>
//         <select value={subject} onChange={(e) => { setSubject(e.target.value); setIndex(0); setScore(0); setFinished(false); }}>
//           {Object.keys(demoQuestions).map((s) => <option key={s} value={s}>{s}</option>)}
//         </select>
//       </div>

//       {!finished ? (
//         <div>
//           <p><strong>Q:</strong> {questions[index].q}</p>
//           <div style={{ display: 'flex', gap: 8 }}>
//             {questions[index].options.map((opt, i) => (
//               <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <p>Finished! Score: {score} / {questions.length}</p>
//           <button onClick={() => { setIndex(0); setScore(0); setFinished(false); }}>Try again</button>
//         </div>
//       )}
//     </div>
//   );
// }

// src/app/student/quiz/page.js
"use client";
import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000/api"; // ✅ must match your backend

export default function QuizPage() {
  const [subject, setSubject] = useState("Biology"); // default to match DB
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🧠 Fetch quizzes from backend
  const fetchQuizzes = async (subj) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}/student/pq/quiz`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch quizzes (status ${res.status})`);
      }

      const data = await res.json();
      console.log("Quiz response:", data);

      const allQuizzes = data.questions || [];

      // Extract array if wrapped
      // const allQuizzes = Array.isArray(data) ? data : data.quizzes || [];

      // Filter by subject
      const filtered = allQuizzes.filter(
        (q) => q.subject.toLowerCase() === subj.toLowerCase()
      );

      if (filtered.length === 0) {
        setMessage(`⚠️ No quiz available yet for ${subj}.`);
      }

      setQuestions(filtered);
      setIndex(0);
      setScore(0);
      setFinished(false);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      setMessage("⚠️ Error loading quizzes. Please try again.");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch quizzes on subject change
  useEffect(() => {
    fetchQuizzes(subject);
  }, [subject]);

  const handleAnswer = (opt) => {
    const current = questions[index];
    if (opt === current.correctOption) setScore((s) => s + 1);

    if (index + 1 < questions.length) setIndex(index + 1);
    else setFinished(true);
  };

  const handleTryAgain = () => {
    fetchQuizzes(subject);
  };

  return (
    <div
      className="container"
      style={{ maxWidth: 600, margin: "auto", padding: 20 }}
    >
      <h2>JUPEB Quiz Practice</h2>

      <div style={{ marginBottom: 16 }}>
        <label>Choose subject: </label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Math">Math</option>
          <option value="Biology">Biology</option>
        </select>
      </div>

      {loading && <p>Loading questions...</p>}
      {message && <p>{message}</p>}

      {!loading && !finished && questions.length > 0 && (
        <div>
          <p>
            <strong>Q{index + 1}:</strong> {questions[index].question}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Array.isArray(questions[index].option) &&
              questions[index].option.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  style={{
                    padding: 10,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    background: "#f9f9f9",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              ))}
          </div>
        </div>
      )}

      {finished && (
        <div>
          <p>
            🎉 Finished! Your score: <strong>{score}</strong> /{" "}
            {questions.length}
          </p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
}
