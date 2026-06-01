import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '32px 16px 16px' }}>
      <div className="logo-circle">✓</div>
      <h2 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, marginBottom: 5 }}>
        Создать аккаунт
      </h2>
      <p style={{ textAlign: 'center', fontSize: '11.5px', color: '#64748b', marginBottom: 22 }}>
        Начните планировать сегодня
      </p>

      <label className="label-text">Email</label>
      <input className="input-field" placeholder="вы@example.com" style={{ marginBottom: 11 }} />

      <label className="label-text">Пароль</label>
      <input className="input-field" type="password" placeholder="Минимум 8 символов" style={{ marginBottom: 11 }} />

      <label className="label-text">Повторите пароль</label>
      <input className="input-field" type="password" placeholder="Введите ещё раз" style={{ marginBottom: 16 }} />

      <button className="btn-grad" onClick={() => navigate('/tasks')}>Зарегистрироваться</button>

      <p style={{ textAlign: 'center', marginTop: 16, fontSize: '11.5px', color: '#64748b' }}>
        Уже есть аккаунт?{' '}
        <button className="link-text" onClick={() => navigate('/')}>Войти</button>
      </p>
    </div>
  );
}

export default Register;