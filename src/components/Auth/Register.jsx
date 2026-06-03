import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "../../api";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError('Ошибка регистрации. Email может быть уже занят.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '32px 16px 16px' }}>
      <div className="logo-circle">✓</div>
      <h2 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, marginBottom: 5 }}>
        Создать аккаунт
      </h2>
      
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
          style={{ marginBottom: 11 }}
          required
        />

        <label className="label-text">Повторите пароль</label>
        <input 
          className="input-field" 
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ marginBottom: 16 }}
          required
        />

        {error && <p style={{ color: 'red', fontSize: '11px', marginBottom: 10 }}>{error}</p>}

        <button type="submit" className="btn-grad">Зарегистрироваться</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 16, fontSize: '11.5px', color: '#64748b' }}>
        Уже есть аккаунт?{' '}
        <button className="link-text" onClick={() => navigate('/')}>Войти</button>
      </p>
    </div>
  );
}

export default Register;