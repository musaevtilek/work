import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("user5832@example.com"); // ← ваш email
  const [password, setPassword] = useState("12345678"); // ← ваш пароль
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const accessToken = response.data.tokens?.accessToken;
      const refreshToken = response.data.tokens?.refreshToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/tasks");
      } else {
        setError("Не удалось получить токен");
      }
    } catch (err) {
      setError("Неверный email или пароль");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "32px 16px 16px" }}>
      <div className="logo-circle">✓</div>
      <h2
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: 5,
        }}
      >
        С возвращением
      </h2>
      <p
        style={{
          textAlign: "center",
          fontSize: "11.5px",
          color: "#64748b",
          marginBottom: 22,
        }}
      >
        Войдите, чтобы продолжить
      </p>

      <form onSubmit={handleSubmit}>
        <label className="label-text">Email</label>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 11 }}
          required
        />

        <label className="label-text">Пароль</label>
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 6 }}
          required
        />

        {error && (
          <p style={{ color: "red", fontSize: "11px", marginBottom: 10 }}>
            {error}
          </p>
        )}

        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <button type="button" className="link-text">
            Забыли пароль?
          </button>
        </div>

        <button type="submit" className="btn-grad">
          Войти
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: 16,
          fontSize: "11.5px",
          color: "#64748b",
        }}
      >
        Нет аккаунта?{" "}
        <button className="link-text" onClick={() => navigate("/register")}>
          Регистрация
        </button>
      </p>
    </div>
  );
}

export default Login;
