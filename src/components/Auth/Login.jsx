import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '32px 16px 16px' }}>
      <div className="logo-circle">✓</div>
      <h2 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, marginBottom: 5 }}>
        С возвращением
      </h2>
      <p style={{ textAlign: 'center', fontSize: '11.5px', color: '#64748b', marginBottom: 22 }}>
        Войдите, чтобы продолжить
      </p>
      
      <label className="label-text">Email</label>
      <input className="input-field" defaultValue="aida@example.com" style={{ marginBottom: 11 }} />
      
      <label className="label-text">Пароль</label>
      <input className="input-field" type="password" defaultValue="password" style={{ marginBottom: 6 }} />
      
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <button className="link-text">Забыли пароль?</button>
      </div>
      
      <button className="btn-grad" onClick={() => navigate('/tasks')}>Войти</button>
      
      <p style={{ textAlign: 'center', marginTop: 16, fontSize: '11.5px', color: '#64748b' }}>
        Нет аккаунта?{' '}
        <button className="link-text" onClick={() => navigate('/register')}>Регистрация</button>
      </p>
    </div>
  );
}

export default Login;