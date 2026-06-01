import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Здесь будет логика выхода
    console.log('Выход из аккаунта');
    navigate('/');
  };

  return (
    <div style={{ padding: '6px 14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <button 
          style={{ width: 32, height: 32, borderRadius: 10, background: 'white', border: '1px solid #e0e7ff', fontSize: 16, cursor: 'pointer' }}
          onClick={() => navigate('/tasks')}
        >←</button>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Профиль</h2>
      </div>

      <div style={{ textAlign: 'center', padding: '14px 0 18px' }}>
        <div className="avatar-big">А</div>
        <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 3px' }}>Айда Касымова</h3>
        <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0 }}>aida@example.com</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 18 }}>
        <div className="stat-card">
          <div className="stat-num">20</div>
          <div className="stat-lbl">Всего</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">8</div>
          <div className="stat-lbl">Готово</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">40%</div>
          <div className="stat-lbl">Прогресс</div>
        </div>
      </div>

      <p style={{ fontSize: '10.5px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 7px', fontWeight: 500 }}>
        Настройки
      </p>

      <div className="menu-row">
        <div className="menu-icon">🔔</div>
        <span className="menu-label">Уведомления</span>
        <span className="menu-arrow">›</span>
      </div>

      <div className="menu-row">
        <div className="menu-icon">🌙</div>
        <span className="menu-label">Тёмная тема</span>
        <span className="menu-arrow">›</span>
      </div>

      <div className="menu-row">
        <div className="menu-icon">🌐</div>
        <span className="menu-label">Русский</span>
        <span className="menu-arrow">›</span>
      </div>

      <div className="divider"></div>

      <div className="menu-row" onClick={handleLogout}>
        <div className="menu-icon danger">↪</div>
        <span className="menu-label" style={{ color: '#dc2626' }}>Выйти</span>
      </div>
    </div>
  );
}

export default Profile;