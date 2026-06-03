import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [completed, setCompleted] = useState(false);

  // Загрузка задачи при открытии
  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`/api/tasks/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      if (response.status === 401) {
        alert("Сессия истекла. Войдите снова.");
        localStorage.clear();
        navigate("/");
        return;
      }

      const data = await response.json();
      const taskData = data.task || data;

      setTitle(taskData.title || "");
      setDescription(taskData.description || "");
      // Форматируем дату из ISO в YYYY-MM-DD
      if (taskData.dueDate) {
        setDueDate(taskData.dueDate.split("T")[0]);
      }
      setPriority(taskData.priority || "medium");
      setCompleted(taskData.completed || false);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Ошибка загрузки задачи");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Введите заголовок задачи");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      // Форматируем дату для API
      let formattedDueDate = null;
      if (dueDate) {
        formattedDueDate = new Date(dueDate).toISOString();
      }

      const updatedTask = {
        title: title.trim(),
        description: description.trim() || "",
        dueDate: formattedDueDate,
        priority: priority,
        completed: completed,
      };

      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.status === 401) {
        alert("Сессия истекла. Войдите снова.");
        localStorage.clear();
        navigate("/");
        return;
      }

      if (response.ok) {
        alert("✅ Задача обновлена!");
        navigate("/tasks");
      } else {
        const error = await response.json();
        alert("Ошибка: " + (error.message || "Не удалось сохранить"));
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка соединения");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Удалить задачу? Это действие нельзя отменить.")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });

      if (response.status === 401) {
        alert("Сессия истекла. Войдите снова.");
        localStorage.clear();
        navigate("/");
        return;
      }

      if (response.ok) {
        alert("✅ Задача удалена!");
        navigate("/tasks");
      } else {
        alert("Ошибка при удалении");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка соединения");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
        Загрузка задачи...
      </div>
    );
  }

  return (
    <div style={{ padding: "6px 14px 16px" }}>
      {/* Шапка */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "white",
            border: "1px solid #e0e7ff",
            cursor: "pointer",
            fontSize: 16,
          }}
          onClick={() => navigate("/tasks")}
        >
          ←
        </button>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0, flex: 1 }}>
          Изменить задачу
        </h2>
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "#fee2e2",
            color: "#dc2626",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
          }}
          onClick={handleDelete}
        >
          🗑
        </button>
      </div>

      {/* Форма */}
      <div className="card-soft" style={{ marginBottom: 11 }}>
        <label className="label-text">Заголовок</label>
        <input
          className="input-field"
          placeholder="Введите заголовок"
          value={title}
          style={{ marginBottom: 11 }}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label-text">Описание</label>
        <textarea
          className="input-field"
          rows="3"
          placeholder="Введите описание"
          style={{ resize: "none" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="card-soft" style={{ marginBottom: 11 }}>
        <label className="label-text">Срок выполнения</label>
        <input
          className="input-field"
          type="date"
          value={dueDate}
          style={{ marginBottom: 11 }}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label className="label-text">Приоритет</label>
        <div className="priority-pick">
          <button
            type="button"
            className={priority === "low" ? "active" : ""}
            onClick={() => setPriority("low")}
          >
            Низкий
          </button>
          <button
            type="button"
            className={priority === "medium" ? "active medium" : ""}
            onClick={() => setPriority("medium")}
          >
            Средний
          </button>
          <button
            type="button"
            className={priority === "high" ? "active high" : ""}
            onClick={() => setPriority("high")}
          >
            Высокий
          </button>
        </div>
      </div>

      {/* Статус (выполнено/не выполнено) */}
      <div
        className="card-soft"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div>
          <p style={{ fontSize: "12.5px", fontWeight: 500, margin: 0 }}>
            Статус
          </p>
          <p
            style={{ fontSize: "10.5px", color: "#64748b", margin: "2px 0 0" }}
          >
            {completed ? "✅ Выполнена" : "🟡 Активная задача"}
          </p>
        </div>
        <div
          style={{
            width: 38,
            height: 22,
            borderRadius: 11,
            background: completed ? "#10b981" : "#e2e8f0",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => setCompleted(!completed)}
        >
          <div
            style={{
              position: "absolute",
              top: 2,
              left: completed ? 18 : 2,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "white",
              transition: "left 0.2s",
            }}
          ></div>
        </div>
      </div>

      {/* Кнопка сохранения */}
      <button className="btn-grad" onClick={handleSave}>
        Сохранить изменения
      </button>
    </div>
  );
}

export default TaskEdit;
