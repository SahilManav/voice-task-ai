import { CheckCircle, Clock } from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

const getProductivityScore = (completionRate, voiceTaskCount) => {
  if (completionRate === 0 && voiceTaskCount === 0) {
    return 0;
  }

  return Math.min(100, Math.round(completionRate * 0.8 + voiceTaskCount * 6));
};

export default function DashboardStats({ tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;
  const voiceTaskCount = tasks.filter((task) => task.voiceCommand).length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const productivityScore = getProductivityScore(
    completionRate,
    voiceTaskCount
  );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        title="Completed Tasks"
        value={completedCount.toString()}
        subtext="Action items completed"
        accent="emerald"
        icon={CheckCircle}
      />
      <AnalyticsCard
        title="Pending Tasks"
        value={pendingCount.toString()}
        subtext="Awaiting verification"
        accent="purple"
        icon={Clock}
      />
      <AnalyticsCard
        title="Today's Progress"
        value={`${completionRate}%`}
        subtext="Overall completion rate"
        accent="cyan"
        progress={completionRate}
      />
      <AnalyticsCard
        title="Productivity Score"
        value={productivityScore.toString()}
        subtext="System efficiency score"
        accent="purple"
        trend={{
          value: `${voiceTaskCount} voice tasks`,
          isPositive: voiceTaskCount > 0,
        }}
      />
    </div>
  );
}
