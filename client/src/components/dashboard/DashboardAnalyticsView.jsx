import AnalyticsCard from "./AnalyticsCard";

const getOverdueCount = (tasks) =>
  tasks.filter((task) => {
    if (!task.dueDate || task.completed) {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    return !Number.isNaN(dueDate.getTime()) && dueDate < new Date();
  }).length;

export default function DashboardAnalyticsView({ tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;
  const voiceTaskCount = tasks.filter((task) => task.voiceCommand).length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const productivityVelocity =
    tasks.length > 0
      ? ((completedCount * 1.5 + pendingCount * 0.5) / tasks.length).toFixed(1)
      : "0.0";
  const overdueCount = getOverdueCount(tasks);

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
          title="Productivity Velocity"
          value={productivityVelocity}
          subtext="Efficiency index score"
          accent="purple"
        />
        <AnalyticsCard
          title="Audio Feeds Captured"
          value={voiceTaskCount.toString()}
          subtext="Voice inputs represented in tasks"
          accent="cyan"
        />
        <AnalyticsCard
          title="Due Threshold Alerts"
          value={overdueCount.toString()}
          subtext="Tasks requiring immediate action"
          accent="danger"
        />
      </div>
    </div>
  );
}
