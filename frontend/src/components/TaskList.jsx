
// frontend/src/components/TaskList.jsx

import React from 'react';

const TaskList = ({ tasks, onDelete }) => {
  const handleStatusChange = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: 'completed' })
      });

      window.location.reload(); // Optional: refresh list or update state
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
          <div className={`d-flex align-items-center ${task.status === 'completed' ? 'bg-success bg-opacity-10' : ''}`}>
            <input
              type="checkbox"
              className="form-check-input me-3"
              checked={task.status === 'completed'}
              onChange={() => handleStatusChange(task._id)}
              aria-label="Mark as complete"
            />
            <div>
              <h5 className={`mb-1 ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : ''}`}>
                {task.title}
              </h5>
              {task.description && <small className="d-block text-muted">{task.description}</small>}
            </div>
          </div>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;