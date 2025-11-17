// src/app/student/page.js
// Student dashboard - links to main learning sections

"use client";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import "../../styles/student.css";

export default function StudentDashboard() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <h1>Student Dashboard</h1>
        <p>Choose a subject to begin studying or take a quiz.</p>

        <div className="subjects-grid">
          <Link href="/student/notes"><div className="subject-card">Notes (Math / Physics / Chemistry / Biology)</div></Link>
          <Link href="/student/quiz"><div className="subject-card">Quizzes</div></Link>
          <Link href="/student/pastquestions"><div className="subject-card">Past Questions</div></Link>
        </div>
      </main>
    </div>
  );
}
