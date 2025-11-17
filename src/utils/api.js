// // src/utils/api.js
// // Reusable API helper functions. Replace BASE_URL with your backend API base URL.

// // TODO: Replace this with your backend URL when it's ready
// export const BASE_URL = "http://localhost:5000/api";

// // Fetch GET request helper
// export async function fetchData(endpoint) {
//   try {
//     // endpoint example: "students", "student/notes/allnotes", "admin/generate-code"
//     const res = await fetch(`${BASE_URL}/${endpoint}`);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch ${endpoint} - status ${res.status}`);
//     }
//     return await res.json();
//   } catch (err) {
//     console.error("fetchData error:", err);
//     return null;
//   }
// }

// // POST helper
// export async function postData(endpoint, payload) {
//   try {
//     const res = await fetch(`${BASE_URL}/${endpoint}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error(`Failed POST ${endpoint}`);
//     return await res.json();
//   } catch (err) {
//     console.error("postData error:", err);
//     return null;
//   }
// }

// /*
//   ----------------
//   HOW TO CONNECT:
//   - When backend is ready, edit BASE_URL at the top.
//   - Use fetchData('student/notes/allnotes') or postData('auth/login', {email, password})
//   - The backend must provide endpoints matching the usages in pages below.
// */

// src/utils/api.js
// Reusable API helper functions for your frontend ↔ backend communication.

// ✅ Base URL (use your backend port or deployed URL)
export const BASE_URL = "http://localhost:5000/api";

// -------------------------------
// GET Request Helper
// -------------------------------
export async function fetchData(endpoint) {
  try {
    const fullUrl = `${BASE_URL}/${endpoint}`;
    console.log("📡 GET:", fullUrl);

    const res = await fetch(fullUrl);

    const text = await res.text();
    console.log("🧩 Raw GET response:", text);

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      const message =
        data?.message ||
        data?.error ||
        data?.raw ||
        `Request failed with status ${res.status}`;

      return { error: message, status: res.status };
    }

    return data; // success
  } catch (err) {
    console.error("🚨 fetchData() error:", err.message);
    return { error: err.message };
  }
}

// -------------------------------
// POST Request Helper
// -------------------------------
export async function postData(endpoint, payload) {
  try {
    const fullUrl = `${BASE_URL}/${endpoint}`;
    console.log("📡 POST:", fullUrl);
    console.log("📦 Payload:", payload);

    const res = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Read backend reply as text first
    const text = await res.text();

    // Log the raw response to debug
    console.log("🧩 Backend raw response:", text);
    console.log("📊 Status:", res.status, res.statusText);

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      const message =
        data?.message ||
        data?.error ||
        data?.raw ||
        `Request failed with status ${res.status}`;
      return { error: message, status: res.status };
    }

    // Try to parse the text as JSON
    return data;
  } catch (err) {
    console.error("🚨 postData() error:", err.message);
    return { error: err.message }; // So frontend won’t crash
  }
}

/*
  ----------------
  HOW TO USE:
  ----------------
  1️⃣ GET Example:
      const quizzes = await fetchData("quiz");

  2️⃣ POST Example:
      const login = await postData("admin/login", { username, password });

  3️⃣ Make sure your backend routes match:
      app.use("/api/admin", require("./routes/adminRoute"));
      app.use("/api/student", require("./routes/studentRoute"));
      app.use("/api", require("./routes/questionRoute"));
*/
