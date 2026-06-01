function TaskItem({ task, onToggle, onClick }) {
  const getPriorityClass = (priority) => {
    if (priority === 'high') return 'pri-h';
    if (priority === 'medium') return 'pri-m';
    return 'pri-l';
  };

  const getPriorityText = (priority) => {
    if (priority === 'high') return 'Высокий';
    if (priority === 'medium') return 'Средний';
    return 'Низкий';
  };

  return (
    <div className="task-item" onClick={onClick}>
      <div 
        className={`task-check ${task.completed ? 'done' : ''}`} 
        onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
      ></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className={`task-title ${task.completed ? 'done' : ''}`}>{task.title}</p>
        <div className="task-meta">
          <span className={`priority-dot ${getPriorityClass(task.priority)}`}></span>
          {getPriorityText(task.priority)} · {task.dueDate}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;