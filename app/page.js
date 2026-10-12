"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  function addTask(event) {
    event.preventDefault();
    const title = taskText.trim();

    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
    setTaskText("");
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="page-shell">
      <section className="todo-app" aria-labelledby="page-title">
        <header className="app-header">
          <p className="eyebrow">A little more focus</p>
          <h1 id="page-title">TODO APPLICATION</h1>
          <p className="subtitle">Write it down. Take it one task at a time.</p>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <label className="visually-hidden" htmlFor="task-input">
            Task name
          </label>
          <input
            id="task-input"
            type="text"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="What needs to get done?"
            maxLength={160}
          />
          <button className="add-button" type="submit">
            Add Task
          </button>
        </form>

        <div className="list-heading">
          <h2>Your tasks</h2>
          <span className="task-count" aria-live="polite">
            {completedCount} / {tasks.length} done
          </span>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Add one to get started.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task-item" key={task.id}>
                <label className="task-label">
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? "task-title completed" : "task-title"}>
                    {task.title}
                  </span>
                </label>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  title="Delete task"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer className="page-footer">One thing at a time.</footer>
    </main>
  );
}
