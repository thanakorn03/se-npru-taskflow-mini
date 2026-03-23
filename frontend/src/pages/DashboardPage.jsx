import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../store/slices/taskSlice';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getTasks());
    }
  }, [user, navigate, dispatch]);

  if (isLoading && tasks.length === 0) {
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
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Task Dashboard</h1>
          <p className="text-base-content/60 mt-1">
            Welcome back, <span className="font-medium text-base-content">{user?.name}</span>!
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-4 text-sm">
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          {/* Create Task */}
          <div className="card bg-base-100 shadow-sm h-fit">
            <div className="card-body gap-4">
              <h2 className="card-title text-lg">Create New Task</h2>
              <div className="divider my-0" />
              <TaskForm />
            </div>
          </div>

          {/* Task List */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body gap-4">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-lg">Your Tasks</h2>
                <span className="badge badge-neutral">{tasks.length}</span>
              </div>
              <div className="divider my-0" />
              <TaskList tasks={tasks} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
