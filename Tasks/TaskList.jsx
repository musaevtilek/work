import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Подготовить презентацию', priority: 'high', dueDate: '15:00', completed: false },
    { id: 2, title: 'Купить продукты', priority: 'medium', dueDate: 'Завтра', completed: false },
    { id: 3, title: 'Записаться к врачу', priority: 'medium', dueDate: 'Готово', completed: true },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const stats = {
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    today: tasks.filter(t => t.dueDate === 'Сегодня').length
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div style={{ padding: '6px 14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <p style={{ fontSize: 11, color: '#64748b' }}>Привет, Айда 👋</p>
          <h2 style={{ fontSize: 18, fontWeight: 600 }} className="gradient-text">Мои задачи</h2>
        </div>
        <div className="avatar-big" style={{ width: 34, height: 34, fontSize: 12 }} 
             onClick={() => navigate('/profile')}>А</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
        <div className="stat-card"><div className="stat-num">{stats.active}</div><div className="stat-lbl">Активных</div></div>
        <div className="stat-card"><div className="stat-num">{stats.completed}</div><div className="stat-lbl">Готово</div></div>
        <div className="stat-card"><div className="stat-num">{stats.today}</div><div className="stat-lbl">Сегодня</div></div>
      </div>

      <div style={{ position: 'relative', marginBottom: 12 }}>
        <input className="input-field" placeholder="Поиск задач..." style={{ paddingLeft: 32 }} />
        <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>⌕</span>
      </div>

      <div style={{ display: 'flex', gap: 5, marginBottom: 12 }}>
        <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Все · {tasks.length}</button>
        <button className={`chip ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Активные</button>
        <button className={`chip ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Готово</button>
      </div>

      {filteredTasks.map(task => (
        <div key={task.id} className="task-item" onClick={() => navigate(`/tasks/edit/${task.id}`)}>
          <div className={`task-check ${task.completed ? 'done' : ''}`} onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className={`task-title ${task.completed ? 'done' : ''}`}>{task.title}</p>
            <div className="task-meta">
              <span className={`priority-dot pri-${task.priority === 'high' ? 'h' : task.priority === 'medium' ? 'm' : 'l'}`}></span>
              {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'} · {task.dueDate}
            </div>
          </div>
        </div>
      ))}

      <button className="fab" onClick={() => navigate('/tasks/new')}>+</button>
    </div>
  );
}

export default TaskList;