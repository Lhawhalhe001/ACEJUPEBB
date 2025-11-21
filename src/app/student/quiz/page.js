
// "use client";
// import React, { useState, useEffect } from "react";
// import Navbar from "../../../components/Navbar";
// import "../../../styles/student.css";

// const BASE_URL = "https://ace-jupeb.onrender.com/api";

// export default function QuizPage() {
//   const [subject, setSubject] = useState("Biology");
//   const [questions, setQuestions] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [finished, setFinished] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const fetchQuizzes = async (subj) => {
//     setLoading(true);
//     setMessage("");
//     setQuestions([]);
//     setIndex(0);
//     setScore(0);
//     setFinished(false);

//     try {
//       const res = await fetch(`${BASE_URL}/student/pq/quiz`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!res.ok) throw new Error("Failed to fetch quizzes");

//       const data = await res.json();
//       console.log("Fetched data:", data); // ✅ log for debugging

//       const allQuizzes = data.questions || [];
//       const filtered = allQuizzes.filter(
//         (q) => q.subject.toLowerCase() === subj.toLowerCase()
//       );

//       if (filtered.length === 0) {
//         setMessage(`⚠️ No quiz available for ${subj}.`);
//       }

//       setQuestions(filtered);
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Error loading quizzes.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuizzes(subject);
//   }, [subject]);

//   const handleAnswer = (opt) => {
//     const current = questions[index];
//     if (opt === current.correctOption) setScore((s) => s + 1);

//     if (index + 1 < questions.length) {
//       setIndex(index + 1);
//     } else {
//       setFinished(true);
//     }
//   };

//   const handleTryAgain = () => {
//     fetchQuizzes(subject);
//   };

//   return (
//     <div>
//       <Navbar />

//       <main className="container" style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
//         <h2>JUPEB Quiz Practice</h2>

//         {/* Subject selection */}
//         <div style={{ marginBottom: 16 }}>
//           <label>Choose subject: </label>
//           <select value={subject} onChange={(e) => setSubject(e.target.value)}>
//             <option value="Physics">Physics</option>
//             <option value="Chemistry">Chemistry</option>
//             <option value="Math">Math</option>
//             <option value="Biology">Biology</option>
//           </select>
//         </div>

//         {/* Loading & messages */}
//         {loading && <p>Loading questions...</p>}
//         {message && <p>{message}</p>}

//         {/* Quiz questions */}
//         {!loading && !finished && questions.length > 0 && (
//           <div>
//             <p>
//               <strong>Q{index + 1}:</strong> {questions[index].question}
//             </p>

//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {questions[index].option?.length > 0 ? (
//                 questions[index].option.map((opt, i) => (
//                   <button
//                     key={i}
//                     onClick={() => handleAnswer(opt)}
//                     className="quiz-option"
//                     style={{
//                       padding: 10,
//                       borderRadius: 10,
//                       border: "1px solid #ddd",
//                       background: "white",
//                       cursor: "pointer",
//                       transition: "0.2s ease",
//                       color: " #206cc9ff"
//                     }}
//                   >
//                     {opt}
//                   </button>
//                 ))
//               ) : (
//                 <p>No options available for this question.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Finished screen */}
//         {finished && (
//           <div>
//             <p>
//               🎉 Finished! Your score: <strong>{score}</strong> / {questions.length}
//             </p>
//             <button onClick={handleTryAgain} className="try-again-btn">
//               Try Again
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/student.css";

const BASE_URL = "https://ace-jupeb-production.up.railway.app/api";

export default function QuizPage() {
  const [subject, setSubject] = useState("Biology");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchQuizzes = async (subj) => {
    setLoading(true);
    setMessage("");
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setUserAnswers({});
    setFinished(false);

    try {
      const res = await fetch(`${BASE_URL}/student/pq/quiz`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch quizzes");

      const data = await res.json();
      console.log("Fetched data:", data);

      const allQuizzes = data.questions || [];

      const filtered = allQuizzes.filter(
        (q) => q.subject?.toLowerCase() === subj.toLowerCase()
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

    // Track user's choice
    const updatedAnswers = { ...userAnswers, [index]: opt };
    setUserAnswers(updatedAnswers);

    // Recalculate score whenever answer changes
    let newScore = 0;
    Object.keys(updatedAnswers).forEach((key) => {
      const qIndex = parseInt(key);
      if (updatedAnswers[key] === questions[qIndex].correctOption) {
        newScore++;
      }
    });

    setScore(newScore);

    // Move to next question
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const goBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleTryAgain = () => {
    fetchQuizzes(subject);
  };

  return (
    <div>
      <Navbar />

      <main
        className="container"
        style={{ maxWidth: 700, margin: "auto", padding: 20 }}
      >
        <h2>JUPEB Quiz Practice</h2>

        {/* Subject selection */}
        <div style={{ marginBottom: 16 }}>
          <label>Choose subject: </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Math">Math</option>
            <option value="Biology">Biology</option>
          </select>
        </div>

        {/* Loading */}
        {loading && <p>Loading questions...</p>}

        {/* Messages */}
        {message && <p>{message}</p>}

        {/* Quiz questions */}
        {!loading && !finished && questions.length > 0 && (
          <div>
            <p>
              <strong>Q{index + 1}:</strong> {questions[index].question}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 10,
              }}
            >
              {questions[index].option?.length > 0 ? (
                questions[index].option.map((opt, i) => {
                  const selected = userAnswers[index] === opt;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      className="quiz-option"
                      style={{
                        padding: 10,
                        borderRadius: 10,
                        border: selected
                          ? "2px solid #206cc9ff"
                          : "1px solid #ddd",
                        background: selected ? "#e3f0ff" : "white",
                        cursor: "pointer",
                        transition: "0.2s ease",
                        color: "#206cc9ff",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })
              ) : (
                <p>No options available for this question.</p>
              )}
            </div>

            {/* Bottom Buttons */}
            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={goBack}
                disabled={index === 0}
                style={{
                  padding: "10px 15px",
                  borderRadius: 10,
                  background: index === 0 ? "#ccc" : "#206cc9ff",
                  color: "white",
                  cursor: index === 0 ? "not-allowed" : "pointer",
                }}
              >
                ⬅ Previous
              </button>

              <p>
                {index + 1} / {questions.length}
              </p>
            </div>
          </div>
        )}

        {/* Finished Screen */}
        {finished && (
          <div>
            <p>
              🎉 Finished! Your score:{" "}
              <strong>
                {score} / {questions.length}
              </strong>
            </p>

            <button
              onClick={handleTryAgain}
              className="try-again-btn"
              style={{
                padding: 10,
                background: "#206cc9ff",
                borderRadius: 8,
                color: "white",
                marginTop: 10,
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
