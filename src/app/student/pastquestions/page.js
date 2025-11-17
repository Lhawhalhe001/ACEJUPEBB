// src/app/student/pastquestions/page.js
// List of past questions per subject (demo data). Backend should provide an endpoint like GET /student/pq/quiz

"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../utils/api";

export default function PastQuestionsPage() {
  const [items, setItems] = useState({});

  useEffect(() => {
    async function load() {
      // Example API call when backend exists:
      const res = await fetchData('student/pq/quiz');
      setItems(res);

      // demo
      // setItems({
      //   Mathematics: [{ id: 1, title: 'Jupeb Math 2020', url: '/past/jupeb-math-2020.pdf' }],
      //   Physics: [{ id: 2, title: 'Jupeb Physics 2019', url: '/past/jupeb-phy-2019.pdf' }],
      // });
    }
    load();
  }, []);

  return (
    <div className="container">
      <h2>Past Questions</h2>
      {Object.keys(items).map((subject) => (
        <section key={subject}>
          <h3>{subject}</h3>
          <ul>
            {items[subject].map((p) => (
              <li key={p.id}><a href={p.url} target="_blank" rel="noreferrer">{p.title}</a></li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
