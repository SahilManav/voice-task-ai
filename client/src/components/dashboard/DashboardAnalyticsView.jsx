import AnalyticsCard from "./AnalyticsCard";

const getOnTimeCount = (tasks) =>
  tasks.filter((task) => {
    if (!task.completed || !task.dueDate) {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    const completedAt = new Date(task.updatedAt ?? task.dueDate);

    return !Number.isNaN(dueDate.getTime()) && completedAt <= dueDate;
  }).length;

const getDelayedCount = (tasks) =>
  tasks.filter((task) => task.status === "delayed").length;

export default function DashboardAnalyticsView({ tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const onTimeCount = getOnTimeCount(tasks);
  const delayedCount = getDelayedCount(tasks);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-white">Advanced Insights</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Completion Ratio"
          value={`${completionRate}%`}
          subtext={`${completedCount} of ${tasks.length} tasks finished`}
          accent="emerald"
          progress={completionRate}
        />
        <AnalyticsCard
          title="Completed On Time"
          value={onTimeCount.toString()}
          subtext="Tasks finished before their due date"
          accent="purple"
        />
        <AnalyticsCard
          title="Pending Tasks"
          value={pendingCount.toString()}
          subtext="Tasks still in progress"
          accent="violet"
        />
        <AnalyticsCard
          title="Delayed Tasks"
          value={delayedCount.toString()}
          subtext="Tasks postponed from their original date"
          accent="danger"
        />
      </div>
    </div>
  );
}
