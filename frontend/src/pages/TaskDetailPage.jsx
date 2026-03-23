import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTask,
  updateTask,
  deleteTask,
  clearError,
  clearCurrentTask,
} from '../store/slices/taskSlice';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

const STATUS_BADGE = {
  completed: 'badge-success',
  'in-progress': 'badge-info',
  pending: 'badge-warning',
};

const PRIORITY_BADGE = {
  high: 'badge-error',
  medium: 'badge-warning',
  low: 'badge-ghost',
};

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { currentTask, isLoading, error } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getTask(id));
    }
    return () => {
      dispatch(clearCurrentTask());
      dispatch(clearError());
    };
  }, [user, id, navigate, dispatch]);

  useEffect(() => {
    if (currentTask) {
      const timer = setTimeout(() => {
        setFormData({
          title: currentTask.title,
          description: currentTask.description || '',
          status: currentTask.status,
          priority: currentTask.priority,
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentTask]);

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ taskId: id, taskData: formData }));
    setIsEditing(false);
  };

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
      navigate('/dashboard');
    }
  };

  if (isLoading || !currentTask) {
    return (
      <>
        <Navbar />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <div className="tf-page">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="mb-4">
          <Link to="/dashboard" className="btn btn-ghost btn-sm gap-1">
            ← Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="alert alert-error mb-4 text-sm">
            <span>{error}</span>
          </div>
        )}

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body gap-5">
            {isEditing ? (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <h2 className="card-title">Edit Task</h2>
                <div className="divider my-0" />

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Title *</legend>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    className="input input-bordered w-full"
                    required
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Description</legend>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    className="textarea textarea-bordered w-full"
                    rows={4}
                  />
                </fieldset>

                <div className="grid grid-cols-2 gap-4">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Status</legend>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={onChange}
                      className="select select-bordered w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Priority</legend>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={onChange}
                      className="select select-bordered w-full"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </fieldset>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? <span className="loading loading-spinner loading-sm" /> : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h1 className="text-2xl font-bold flex-1">{currentTask.title}</h1>
                  <div className="flex gap-2">
                    <span className={`badge ${STATUS_BADGE[currentTask.status] || 'badge-ghost'}`}>
                      {currentTask.status}
                    </span>
                    <span className={`badge badge-outline ${PRIORITY_BADGE[currentTask.priority] || 'badge-ghost'}`}>
                      {currentTask.priority}
                    </span>
                  </div>
                </div>

                <div className="divider my-0" />

                {/* Description */}
                <div>
                  <p className="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-2">
                    Description
                  </p>
                  <p className="text-base-content leading-relaxed">
                    {currentTask.description || (
                      <span className="italic text-base-content/40">No description provided.</span>
                    )}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-base-content/50">
                  <span>Created: {new Date(currentTask.createdAt).toLocaleString()}</span>
                  <span>Updated: {new Date(currentTask.updatedAt).toLocaleString()}</span>
                </div>

                <div className="divider my-0" />

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                    Edit Task
                  </button>
                  <button className="btn btn-error btn-outline" onClick={onDelete}>
                    Delete Task
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
