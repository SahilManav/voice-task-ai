import { Activity } from "lucide-react";

export default function RecentCommands({ commands }) {
  return (
    <div className="space-y-4 rounded-2xl border theme-border theme-card p-5 theme-transition">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold theme-text">Recent Voice Activity</h4>
        <Activity className="h-4 w-4 text-purple-500" />
      </div>

      <div className="space-y-3.5">
        {commands.map((command, index) => (
          <div
            key={`${command.text}-${index}`}
            className="flex flex-col gap-1 rounded-xl border theme-border p-3 theme-bg-input"
          >
            <p className="break-all font-mono text-xs leading-normal theme-text-secondary">
              "{command.text}"
            </p>
            <div className="mt-1 flex items-center justify-between font-mono text-[10px] theme-text-muted">
              <span>{command.time}</span>
              <span className={command.success ? "text-violet-500" : "text-red-500"}>
                {command.success ? "SUCCESS" : "FAILED"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
