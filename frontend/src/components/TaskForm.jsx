import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, clearError } from '../store/slices/taskSlice';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.tasks);
  const { title, description, status, priority } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(formData));
    setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
    dispatch(clearError());
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {error && (
        <div className="alert alert-error text-sm py-2">
          <span>{error}</span>
        </div>
      )}

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Title *</legend>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Enter task title"
          className="input input-bordered w-full"
          required
        />
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Description</legend>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Enter task description (optional)"
          className="textarea textarea-bordered w-full"
          rows={3}
        />
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Status</legend>
          <select name="status" value={status} onChange={onChange} className="select select-bordered w-full">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Priority</legend>
          <select name="priority" value={priority} onChange={onChange} className="select select-bordered w-full">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </fieldset>
      </div>

      <button type="submit" className="btn btn-primary w-full mt-1" disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm" /> : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
