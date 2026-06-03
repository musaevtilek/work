import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from "../../api";

function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Загрузка задач при монтировании компонента
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
      if (error.response?.status === 401) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (task) => {
    try {
      await updateTask(task.id, { ...task, completed: !task.completed });
      await loadTasks(); // Перезагружаем список
    } catch (error) {
      console.error('Ошибка обновления:', error);
    }
  };

  const getPriorityClass = (priority) => {
    if (priority === 'HIGH') return 'pri-h';
    if (priority === 'MEDIUM') return 'pri-m';
    return 'pri-l';
  };

  const getPriorityText = (priority) => {
    if (priority === 'HIGH') return 'Высокий';
    if (priority === 'MEDIUM') return 'Средний';
    return 'Низкий';
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

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка...</div>;
  }

  return (
    <div style={{ padding: '6px 14px 16px' }}>
      {/* ... заголовок и статистика ... */}
      
      {filteredTasks.map(task => (
        <div key={task.id} className="task-item" onClick={() => navigate(`/tasks/edit/${task.id}`)}>
          <div 
            className={`task-check ${task.completed ? 'done' : ''}`} 
            onClick={(e) => { e.stopPropagation(); toggleTask(task); }}
          ></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className={`task-title ${task.completed ? 'done' : ''}`}>{task.title}</p>
            <div className="task-meta">
              <span className={`priority-dot ${getPriorityClass(task.priority)}`}></span>
              {getPriorityText(task.priority)} · {task.dueDate}
            </div>
          </div>
        </div>
      ))}
      
      <button className="fab" onClick={() => navigate('/tasks/new')}>+</button>
    </div>
  );
}

export default TaskList;