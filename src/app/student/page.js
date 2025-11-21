// src/app/student/page.js
// Student dashboard - links to main learning sections

// "use client";
// import Link from "next/link";
// import Navbar from "../../components/Navbar";
// import "../../styles/student.css";

// export default function StudentDashboard() {
//   return (
//     <div>
//       <Navbar />
//       <main className="container">
//         <h1>Student Dashboard</h1>
//         <p>Choose a subject to begin studying or take a quiz.</p>

//         <div className="subjects-grid">
//           <Link href="/student/notes"><div className="subject-card">Notes (Math / Physics / Chemistry / Biology)</div></Link>
//           <Link href="/student/quiz"><div className="subject-card">Quizzes</div></Link>
//           <Link href="/student/pastquestions"><div className="subject-card">Past Questions</div></Link>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import "../../styles/student.css";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [username, setUsername] = useState("");

  // Simulating username fetch (replace with real backend)
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
    else setUsername("Student");
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container py-10">

        {/* Greeting Section */}
        <h1 className="text-4xl font-bold mb-4">
          👋 Hello, <span className="text-blue-600">{username}</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Welcome to your JUPEB Learning Dashboard.
        </p>

        {/* Subjects Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <Link href="/student/notes">
            <div className="subject-card shadow-xl p-8 rounded-2xl border-2 hover:scale-105 transition cursor-pointer bg-white hover:border-blue-500">
              <h2 className="text-2xl font-bold mb-2">📝 Notes</h2>
              <p className="text-gray-600">
                Math • Physics • Chemistry • Biology
              </p>
            </div>
          </Link>

          <Link href="/student/quiz">
            <div className="subject-card shadow-xl p-8 rounded-2xl border-2 hover:scale-105 transition cursor-pointer bg-white hover:border-blue-500">
              <h2 className="text-2xl font-bold mb-2">❓ Quizzes</h2>
              <p className="text-gray-600">Test yourself and improve.</p>
            </div>
          </Link>

          <Link href="/student/pastquestions">
            <div className="subject-card shadow-xl p-8 rounded-2xl border-2 hover:scale-105 transition cursor-pointer bg-white hover:border-blue-500">
              <h2 className="text-2xl font-bold mb-2">📚 Past Questions</h2>
              <p className="text-gray-600">
                Real JUPEB past questions for practice.
              </p>
            </div>
          </Link>
        </div>

        {/* WhatsApp Online Training Group */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-xl mb-10">
          <h2 className="text-3xl font-bold mb-3">🔥 Join Our Online Training Group</h2>
          <p className="text-lg mb-5">
            Get tutorials, tips, solved past questions, and weekly live classes.
          </p>
          <a
            href="https://chat.whatsapp.com/ENHa6z1xDxAAMsr8AGaXzW"
            target="_blank"
            className="bg-white text-blue-700 px-6 py-3 rounded-xl text-lg font-semibold shadow hover:scale-105 transition inline-block"
          >
            Join WhatsApp Group
          </a>
        </section>

        {/* Enquiry & Complaints */}
        <section className="p-8 rounded-3xl bg-gray-100 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">📞 Enquiries & Complaints</h2>
          <p className="text-gray-700 mb-4">
            If you have any issues, questions, or need urgent help—contact us.
          </p>

          <a
            href="https://wa.me/message/GLFS6MHF5LGHP1"
            target="_blank"
            className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow hover:scale-105 transition inline-block"
          >
            Chat on WhatsApp
          </a>
        </section>
      </main>
    </div>
  );
}
