import "./App.css";

export default function App() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      fontFamily: "system-ui, Arial, sans-serif",
      padding: "24px"
    }}>
      <section style={{
        maxWidth: 720,
        width: "100%",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
      }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>Hồ sơ cá nhân</h1>
        <p style={{ color: "#6b7280", marginTop: 4 }}>
          ReactJS • Vite • {new Date().getFullYear()}
        </p>

        <hr style={{ margin: "16px 0 24px", border: 0, borderTop: "1px solid #e5e7eb" }} />

        <ul style={{ lineHeight: 1.9, fontSize: 16 }}>
          <li><strong>Họ tên:</strong> Phan Lê Chí Khanh</li>
          <li><strong>MSSV:</strong> 22110348</li>
          <li><strong>GitHub:</strong> <a href="https://github.com/khanhne1304/CNPM.git" target="_blank" rel="noreferrer">https://github.com/khanhne1304/CNPM.git</a></li>
        </ul>
      </section>
    </main>
  );
}
