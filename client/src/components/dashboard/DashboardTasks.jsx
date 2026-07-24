import { ListTodo, Plus, Mic } from "lucide-react";

import Button from "../common/Button";
import TaskCard from "./TaskCard";

function EmptyTasksState() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#141A29] p-10 text-center">
      <div className="mb-4 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10">
          <Mic className="h-7 w-7 text-violet-400" />
        </div>
      </div>
      <p className="mb-1 text-base font-semibold text-white">No tasks yet</p>
      <p className="mb-4 text-sm text-gray-400">
        Try saying something like:
      </p>
      <p className="mx-auto max-w-xs rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-2 text-sm italic text-violet-300">
        "Create task submit the report by tomorrow, high priority"
      </p>
    </div>
  );
}

export default function DashboardTasks({
  title,
  description,
  tasks,
  isLoadingTasks,
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

      <div className="space-y-4">
        {/* Active Queue Header — highlighted with glow */}
        <div className="flex items-center justify-between rounded-2xl border border-violet-500/40 bg-gradient-to-r from-violet-500/15 to-purple-500/10 px-4 py-3 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
              <ListTodo className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Active Queue</h3>
              <p className="text-[10px] text-violet-300">Your pending tasks</p>
            </div>
            {pendingTasks.length > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-[11px] font-bold text-white shadow-md">
                {pendingTasks.length}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-violet-300 bg-violet-500/20 px-2.5 py-1 rounded-full border border-violet-500/30">
            {pendingTasks.length} Pending
          </span>
        </div>

      {isLoadingTasks ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-[#141A29] p-5 space-y-3 animate-pulse">
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/5" />
                <div className="h-3 w-1/3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : pendingTasks.length > 0 ? (
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
