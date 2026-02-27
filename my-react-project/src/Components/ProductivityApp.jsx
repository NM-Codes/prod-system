import React, { useState, useEffect } from 'react';

const ProductivityApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "studing React", duration: 25 }, 
  ]);
  
  const [activeTask, setActiveTask] = useState(null); 
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isActive, setIsActive] = useState(false);

  const selectTask = (task) => {
    setActiveTask(task);
    setTimeLeft(task.duration * 60); 
    setIsActive(false); 
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      sendNotification(activeTask?.title);
      setIsActive(false);
      markTaskAsComplete(activeTask.id);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, activeTask]);

  const sendNotification = (taskTitle) => {
    if (Notification.permission === 'granted') {
      new Notification("Task finished.✅", {
        body: `The time of "${taskTitle}" is finished.`,
      });
    }
  };

  const markTaskAsComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '40px' }}>
      {/*Tasks list*/}
      <section style={{ flex: 1 }}>
        <h2>Tasks list</h2>
        {tasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => selectTask(task)}
            style={{ 
              padding: '10px', 
              border: activeTask?.id === task.id ? '2px solid blue' : '1px solid #ccc',
              cursor: 'pointer',
              marginBottom: '10px',
              backgroundColor: task.completed ? '#e6fffa' : 'white'
            }}
          >
            {task.title} ({task.duration} minute) {task.completed && "✔️"}
          </div>
        ))}
      </section>

      {/* the timer is syncedه */}
      <section style={{ flex: 1, textAlign: 'center', border: '1px solid black', padding: '20px' }}>
        <h2>Timer: {activeTask ? activeTask.title : 'select a task'}</h2>
        <div style={{ fontSize: '3rem' }}>
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
        <button disabled={!activeTask} onClick={() => setIsActive(!isActive)}>
          {isActive ? 'stop' : 'start'}
        </button>
      </section>
    </div>
  );
};

export default ProductivityApp;