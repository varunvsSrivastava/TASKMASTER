

// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import TaskList from './TaskList';
// import TaskForm from './TaskForm';

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     const res = await api.get('/tasks', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     setTasks(res.data);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const addTask = (newTask) => {
//     setTasks([newTask, ...tasks]);
//   };

//   const deleteTask = async (id) => {
//     await api.delete(`/tasks/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     setTasks(tasks.filter(task => task._id !== id));
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Your Tasks</h2>
//       </div>
//       <div className="row">
//         <div className="col-md-6">
//           <TaskForm onAddTask={addTask} />
//         </div>
//         <div className="col-md-6">
//           <TaskList tasks={tasks} onDelete={deleteTask} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// frontend/src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Navbar from './Navbar'; // <-- Import Navbar

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <>
      <Navbar /> {/* <-- Add Navbar here */}

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Your Tasks</h2>
            <TaskList tasks={tasks} onDelete={deleteTask} />
          </div>
          <div className="col-md-6">
            <h3>Add New Task</h3>
            <TaskForm onAddTask={addTask} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;