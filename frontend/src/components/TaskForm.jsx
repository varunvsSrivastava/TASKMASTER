// // frontend/src/components/TaskForm.jsx
// import React, { useState } from 'react';
// import api from '../services/api';

// const TaskForm = ({ onAddTask }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [status, setStatus] = useState('pending');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/tasks', { title, description, status }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       onAddTask(res.data);
//       setTitle('');
//       setDescription('');
//       setStatus('pending');
//     } catch (err) {
//       alert('Error creating task');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//       <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//       <select value={status} onChange={(e) => setStatus(e.target.value)}>
//         <option value="pending">Pending</option>
//         <option value="in-progress">In Progress</option>
//         <option value="completed">Completed</option>
//       </select>
//       <button type="submit">Add Task</button>
//     </form>
//   );
// };

// export default TaskForm;


// frontend/src/components/TaskForm.jsx

import React, { useState } from 'react';
import api from '../services/api';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', { title, description, status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      onAddTask(res.data);
      setTitle('');
      setDescription('');
      setStatus('pending');
    } catch (err) {
      alert('Error creating task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="taskTitle" className="form-label">Task Title</label>
        <input
          type="text"
          className="form-control"
          id="taskTitle"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="taskDescription" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="taskDescription"
          rows="3"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="taskStatus" className="form-label">Status</label>
        <select
          className="form-select"
          id="taskStatus"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success w-100">Add Task</button>
    </form>
  );
};

export default TaskForm;