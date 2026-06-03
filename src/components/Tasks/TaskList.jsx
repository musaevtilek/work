import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("/api/tasks", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (task) => {
    try {
      const token = localStorage.getItem("accessToken");
      const updatedTask = { ...task, completed: !task.completed };

      await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updatedTask),
      });

      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t,
        ),
      );
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Фильтрация по поиску
  const filteredBySearch = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  // Фильтрация по статусу
  const filteredTasks = filteredBySearch.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const stats = {
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
    today: tasks.filter((t) => t.dueDate === "Сегодня").length,
  };

  if (loading)
    return <div style={{ padding: 20, textAlign: "center" }}>Загрузка...</div>;

  return (
    <div style={{ padding: "6px 14px 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div>
          <p style={{ fontSize: 11, color: "#64748b" }}>Привет, Тилек 🥰</p>
          <h2
            style={{ fontSize: 18, fontWeight: 600 }}
            className="gradient-text"
          >
            Мои задачи
          </h2>
        </div>
        <div
          className="avatar-big"
          style={{ width: 34, height: 34, fontSize: 12 }}
          onClick={() => navigate("/profile")}
        >
          Т
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 6,
          marginBottom: 14,
        }}
      >
        <div className="stat-card">
          <div className="stat-num">{stats.active}</div>
          <div className="stat-lbl">Активных</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{stats.completed}</div>
          <div className="stat-lbl">Готово</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{stats.today}</div>
          <div className="stat-lbl">Сегодня</div>
        </div>
      </div>

      {/* Поиск */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input
          className="input-field"
          placeholder="Поиск задач..."
          style={{ paddingLeft: 32 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span
          style={{
            position: "absolute",
            left: 11,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
          }}
        >
          🔍
        </span>
      </div>

      {/* Фильтры */}
      <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
        <button
          className={`chip ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Все · {filteredBySearch.length}
        </button>
        <button
          className={`chip ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Активные
        </button>
        <button
          className={`chip ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Готово
        </button>
      </div>

      {/* Список задач */}
      {filteredTasks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          {searchTerm
            ? "Ничего не найдено 🔍"
            : "Нет задач. Нажмите + чтобы добавить"}
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="task-item"
            onClick={() => navigate(`/tasks/edit/${task.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div
              className={`task-check ${task.completed ? "done" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(task);
              }}
            ></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className={`task-title ${task.completed ? "done" : ""}`}>
                {task.title}
              </p>
              <div className="task-meta">
                <span
                  className={`priority-dot pri-${task.priority === "high" ? "h" : "m"}`}
                ></span>
                {task.priority === "high" ? "Высокий" : "Средний"} ·{" "}
                {task.dueDate?.split("T")[0] || "Нет срока"}
              </div>
            </div>
          </div>
        ))
      )}

      <button className="fab" onClick={() => navigate("/tasks/new")}>
        +
      </button>
    </div>
  );
}

export default TaskList;
