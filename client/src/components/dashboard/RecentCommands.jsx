import { Activity } from "lucide-react";

export default function RecentCommands({ commands }) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/5 bg-[#141A29] p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white">Recent Voice Activity</h4>
        <Activity className="h-4 w-4 text-purple-400" />
      </div>

      <div className="space-y-3.5">
        {commands.map((command, index) => (
          <div
            key={`${command.text}-${index}`}
            className="flex flex-col gap-1 rounded-xl border border-white/5 bg-[#0B0F19] p-3"
          >
            <p className="break-all font-mono text-xs leading-normal text-gray-300">
              "{command.text}"
            </p>
            <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-gray-500">
              <span>{command.time}</span>
              <span
                className={
                  command.success ? "text-violet-400" : "text-red-400"
                }
              >
                {command.success ? "SUCCESS" : "FAILED"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
