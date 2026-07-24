import { ListTodo, Plus, Mic } from "lucide-react";

import Button from "../common/Button";
import TaskCard from "./TaskCard";

function EmptyTasksState() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#141A29] p-10 text-center">
      <div className="mb-4 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10">
          <Mic className="h-7 w-7 text-cyan-400" />
        </div>
      </div>
      <p className="mb-1 text-base font-semibold text-white">No tasks yet</p>
      <p className="mb-4 text-sm text-gray-400">
        Try saying something like:
      </p>
      <p className="mx-auto max-w-xs rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm italic text-cyan-300">
        "Create task submit the report by tomorrow, high priority"
      </p>
    </div>
  );
}

export default function DashboardTasks({
  title,
  description,
  tasks,
  onAddTask,
  onComplete,
  onEdit,
  onDelete,
  showAddButton = false,
  showCompletedSection = false,
  gridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}) {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const showHeader = Boolean(title || description || showAddButton);

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex items-center justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-2xl font-extrabold text-white">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-gray-400">{description}</p>
            )}
          </div>

          {showAddButton && (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={onAddTask}
            >
              Add Manual Task
            </Button>
          )}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-teal-400" />
            <h3 className="text-lg font-bold text-white">Active Queue</h3>
          </div>
          <span className="text-xs font-bold uppercase text-gray-500">
            {pendingTasks.length} Pending
          </span>
        </div>

        {pendingTasks.length > 0 ? (
          <div className={`grid gap-6 ${gridClassName}`}>
            {pendingTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={onComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyTasksState />
        )}
      </div>

      {showCompletedSection && completedTasks.length > 0 && (
        <div className="space-y-4 pt-4">
          <p className="text-xs font-bold uppercase text-gray-500">
            Completed Tasks ({completedTasks.length})
          </p>

          <div className={`grid gap-6 opacity-60 ${gridClassName}`}>
            {completedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={onComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
