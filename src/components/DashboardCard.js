// src/components/DashboardCard.js
// Small reusable card for dashboards
export default function DashboardCard({ title, children }) {
  return (
    <div style={{ background: "var(--white)", padding: 18, borderRadius: 10, boxShadow: "0 8px 20px var(--shadow)" }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
