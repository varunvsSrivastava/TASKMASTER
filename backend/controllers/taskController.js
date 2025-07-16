// backend/controllers/taskController.js

const Task = require('../models/Task');

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
// exports.updateTask = async (req, res) => {
//   const { title, description, status, dueDate } = req.body;

//   try {
//     let task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     // Make sure user owns task
//     if (task.user.toString() !== req.user.id) {
//       return res.status(401).json({ message: 'Not authorized' });
//     }

//     task.title = title;
//     task.description = description;
//     task.status = status;
//     task.dueDate = dueDate;

//     await task.save();

//     res.json(task);
//   } catch (error) {
//     console.error(error.message);
//     if (error.kind === 'ObjectId') {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     res.status(500).send('Server error');
//   }
// };
// controllers/taskController.js

exports.updateTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Only update fields that are provided
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne(); // ✅ Use deleteOne() instead of remove()

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).send('Server error');
  }
};