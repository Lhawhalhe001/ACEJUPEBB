// src/components/Navbar.js
// Simple navbar used across pages
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eef6ff" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, color: "var(--blue)" }}>Ace Jupeb</div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
