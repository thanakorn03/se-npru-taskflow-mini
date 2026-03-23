const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { taskValidation, taskUpdateValidation } = require('../utils/validation');

// All routes are protected
router.use(authMiddleware);

router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.route('/:id')
  .get(getTask)
  .put(taskUpdateValidation, updateTask)
  .delete(deleteTask);

module.exports = router;
