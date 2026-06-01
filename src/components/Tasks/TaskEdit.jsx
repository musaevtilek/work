import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // Получаем ID задачи из URL
  const [priority, setPriority] = useState('high');
  const [status, setStatus] = useState(false); // false = активная, true = выполнена
  const [title, setTitle] = useState('Подготовить презентацию');
  const [description, setDescription] = useState('Слайды по итогам Q1');
  const [dueDate, setDueDate] = useState('12 мая 2026, 15:00');

  const handleSave = () => {
    // Здесь будет логика сохранения изменений
    console.log('Сохранено:', { id, title, description, dueDate, priority, status });
    navigate('/tasks');
  };

  const handleDelete = () => {
    // Здесь будет логика удаления задачи
    console.log('Удалена задача:', id);
    navigate('/tasks');
  };

  return (
    <div style={{ padding: '6px 14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <button 
          style={{ width: 32, height: 32, borderRadius: 10, background: 'white', border: '1px solid #e0e7ff', fontSize: 16, cursor: 'pointer' }}
          onClick={() => navigate('/tasks')}
        >←</button>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0, flex: 1 }}>Изменить задачу</h2>
        <button 
          aria-label="Удалить" 
          style={{ width: 32, height: 32, borderRadius: 10, background: '#fee2e2', color: '#dc2626', border: 'none', fontSize: 13, cursor: 'pointer' }}
          onClick={handleDelete}
        >🗑</button>
      </div>

      <div className="card-soft" style={{ marginBottom: 11 }}>
        <label className="label-text">Заголовок</label>
        <input 
          className="input-field" 
          value={title} 
          style={{ marginBottom: 11 }}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label className="label-text">Описание</label>
        <textarea 
          className="input-field" 
          rows="2" 
          style={{ resize: 'none' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="card-soft" style={{ marginBottom: 11 }}>
        <label className="label-text">Срок</label>
        <input 
          className="input-field" 
          value={dueDate} 
          style={{ marginBottom: 11 }}
          onChange={(e) => setDueDate(e.target.value)}
        />
        
        <label className="label-text">Приоритет</label>
        <div className="priority-pick">
          <button 
            className={priority === 'low' ? 'active' : ''}
            onClick={() => setPriority('low')}
          >Низкий</button>
          <button 
            className={priority === 'medium' ? 'active medium' : ''}
            onClick={() => setPriority('medium')}
          >Средний</button>
          <button 
            className={priority === 'high' ? 'active high' : ''}
            onClick={() => setPriority('high')}
          >Высокий</button>
        </div>
      </div>

      <div className="card-soft" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <p style={{ fontSize: '12.5px', fontWeight: 500, margin: 0 }}>Статус</p>
          <p style={{ fontSize: '10.5px', color: '#64748b', margin: '2px 0 0' }}>
            {status ? 'Выполнена' : 'Активная задача'}
          </p>
        </div>
        <div 
          style={{ 
            width: 38, 
            height: 22, 
            borderRadius: 11, 
            background: status ? '#10b981' : '#e2e8f0', 
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={() => setStatus(!status)}
        >
          <div style={{ 
            position: 'absolute', 
            top: 2, 
            left: status ? 18 : 2, 
            width: 18, 
            height: 18, 
            borderRadius: '50%', 
            background: 'white', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'left 0.2s'
          }}></div>
        </div>
      </div>

      <button className="btn-grad" onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default TaskEdit;