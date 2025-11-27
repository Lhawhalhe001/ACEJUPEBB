

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import "../../styles/login.css";
// import { postData } from "../../utils/api";

// export default function LoginPage() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [name, setName] = useState("");
//   const [uniqueCode, setUniqueCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const BASE_URL = "https://ace-jupeb-production.up.railway.app/api";
//     const endpoint = isAdmin ? `admin/login` : `student/login`;

//     const res = await postData(endpoint, { name, uniqueCode });
//     setLoading(false);

//     if (res && res.token) {
//       localStorage.setItem("token", res.token);
//       router.push(isAdmin ? "/admin" : "/student");
//     } else {
//       alert(
//         res?.error ||
//           res?.message ||
//           "Login failed. Please check your credentials."
//       );
//     }
//   };

//   return (
//     <div className="login-container container">
//       <div className="login-card">
//         <h2>{isAdmin ? "Admin Login" : "Student Login"}</h2>
//         <form onSubmit={submit}>
//           <label>{isAdmin ? "Admin Username" : "Student Username"}</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder={
//               isAdmin ? "Enter admin username" : "Enter student username"
//             }
//             required
//           />

//           <label>Password or Access Code</label>
//           <input
//             type="password"
//             value={uniqueCode}
//             onChange={(e) => setUniqueCode(e.target.value)}
//             required
//           />

//           <button type="submit">{loading ? "Checking..." : "Login"}</button>
//         </form>

//         <p className="switch">
//           {isAdmin ? "Login as a Student?" : "Login as an Admin?"}
//           <span onClick={() => setIsAdmin(!isAdmin)} className="switch-link">
//             {" "}
//             Click here
//           </span>
//         </p>

//         <p style={{ marginTop: 10 }}>
//           No account? Ask your admin to generate an access code.
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/login.css";
import { postData } from "../../utils/api";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Student fields
  const [name, setName] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");

  // Admin fields
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isAdmin ? `admin/login` : `student/login`;

    // Build correct payload
    let payload = {};

    if (isAdmin) {
      payload = {
        username: Username,
        password: Password,
      };
    } else {
      payload = {
        name,
        uniqueCode,
      };
    }

    const res = await postData(endpoint, payload);

    setLoading(false);

    if (res && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      router.push(isAdmin ? "/admin" : "/student");
    } else {
      alert(
        res?.error ||
          res?.message ||
          "❌ Login failed! Please check your details."
      );
    }
  };

  return (
    <div className="login-container container">
      <div className="login-card">
        <h2>{isAdmin ? "Admin Login" : "Student Login"}</h2>

        <form onSubmit={submit}>
          {isAdmin ? (
            <>
              {/* ADMIN LOGIN FIELDS */}
              <label>Admin Username</label>
              <input
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </>
          ) : (
            <>
              {/* STUDENT LOGIN FIELDS */}
              <label>Student Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />

              <label>Access Code</label>
              <input
                type="password"
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value)}
                placeholder="Enter access code"
                required
              />
            </>
          )}

          <button type="submit">
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        {/* SWITCH MODE */}
        <p className="switch">
          {isAdmin ? "Login as a Student?" : "Login as an Admin?"}
          <span onClick={() => setIsAdmin(!isAdmin)} className="switch-link">
            {" "}
            Click here
          </span>
        </p>

        {!isAdmin && (
          <p style={{ marginTop: 10 }}>
            No account? Ask your admin to generate an access code.
          </p>
        )}
      </div>
    </div>
  );
}
