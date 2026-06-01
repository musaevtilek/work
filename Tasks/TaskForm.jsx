import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState('medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    // Здесь будет логика сохранения задачи
    console.log({ title, description, dueDate, priority });
    navigate('/tasks');
  };

  return (
    <div className="modal-bg">
      <div className="modal-sheet">
        <div className="modal-handle"></div>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>Новая задача</h3>
        <p style={{ fontSize: 11, color: '#64748b', marginBottom: 14 }}>Опишите, что нужно сделать</p>

        <label className="label-text">Заголовок</label>
        <input 
          className="input-field" 
          placeholder="Например: позвонить маме" 
          style={{ marginBottom: 11 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label-text">Описание</label>
        <textarea 
          className="input-field" 
          rows="2" 
          placeholder="Дополнительно" 
          style={{ resize: 'none', marginBottom: 11 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="label-text">Срок выполнения</label>
        <input 
          className="input-field" 
          placeholder="20 мая 2026, 18:00"
          style={{ marginBottom: 11 }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label className="label-text">Приоритет</label>
        <div className="priority-pick" style={{ marginBottom: 16 }}>
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

        <div style={{ display: 'flex', gap: 8 }}>
          <button 
            style={{ flex: 1, padding: 10, background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 11, fontWeight: 500, fontSize: 13, cursor: 'pointer' }}
            onClick={() => navigate('/tasks')}
          >Отмена</button>
          <button 
            className="btn-grad" 
            style={{ flex: 2 }}
            onClick={handleSubmit}
          >Создать</button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;