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

const TaskItem = ({ task }) => {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md hover:border-primary transition-all duration-200 cursor-pointer">
      <div className="card-body p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="card-title text-base font-semibold">{task.title}</h3>
          <div className="flex gap-1 shrink-0">
            <span className={`badge badge-sm ${STATUS_BADGE[task.status] || 'badge-ghost'}`}>
              {task.status}
            </span>
            <span className={`badge badge-sm badge-outline ${PRIORITY_BADGE[task.priority] || 'badge-ghost'}`}>
              {task.priority}
            </span>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-base-content/60 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-base-content/40">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs text-primary font-medium">View Details →</span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
