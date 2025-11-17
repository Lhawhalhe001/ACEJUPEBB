// src/app/page.js
// Homepage for the portal
// import Link from "next/link";
// import "./page.css";

// export default function HomePage() {
//   return (
//     <main className="container home">
//       <section className="hero">
//         <h1>Ace Jupeb Learning Portal</h1>
//         <p>Prepare for JUPEB — notes, quizzes, and past questions for Math, Physics, Chemistry & Biology.</p>
//         <div className="cta">
//           <Link href="/login"><button>Login</button></Link>
//         </div>
//       </section>

//       <section className="features">
//         <div className="card">Notes — organized by subject</div>
//         <div className="card">Quizzes — timed practice</div>
//         <div className="card">Past Questions — real JUPEB papers</div>
//       </section>
//     </main>
//   );
// }
import Link from "next/link";
import "./page.css";

export default function HomePage() {
  return (
    <main className="container home">
      {/* 🟦 HERO SECTION */}
      <section className="hero">
        <h1>Ace Jupeb Learning Aid</h1>
        <p>
          Prepare for JUPEB — notes, quizzes, and past questions for
          Mathematics, Physics, Chemistry & Biology.
        </p>
        <div className="cta">
          <Link href="/login">
            <button>Login</button>
          </Link>
        </div>
      </section>

      {/* 🟩 FEATURES SECTION */}
      <section className="features">
        <div className="card">Notes — organized by subject</div>
        <div className="card">Quizzes — timed practice</div>
        <div className="card">Past Questions — real JUPEB papers</div>
      </section>

      {/* 🟧 MANUAL PAYMENT SECTION */}
      <section className="manual-payment">
        <h2>Manual Payment Option 💳</h2>
        <p>
          If you prefer to pay manually, please make payment using the account
          details below. After payment, send your proof of payment to our admin.
        </p>

        <div className="payment-box">
          <h3>Payment Details</h3>
          <ul>
            <li>
              <strong>Account Name:</strong> Ace Jupeb Academy
            </li>
            <li>
              <strong>Bank Name:</strong> Access Bank
            </li>
            <li>
              <strong>Account Number:</strong> 0812345678
            </li>
            <li>
              <strong>Amount:</strong> ₦3,000 (Access Code Fee)
            </li>
            <li>
              <strong>Contact:</strong> +234 812 345 6789 (WhatsApp)
            </li>
            <li>
              <strong>Email:</strong> support@acejupeb.com
            </li>
          </ul>

          <div className="upload-note">
            <p>
              📎 After payment, send your **proof of payment** to our WhatsApp
              or email with your full name and subject area.
            </p>
            <Link href="/login">
              <button>Proceed to Login</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
