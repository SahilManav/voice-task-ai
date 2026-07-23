import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const weeklyData = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 80 },
  { day: "Thu", value: 50 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 30 },
  { day: "Sun", value: 45 },
];

export default function ProductivityChart() {
  return (
    <div className="space-y-6 rounded-3xl border border-white/5 bg-[#141A29] p-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-white">
            Weekly Productivity Graph
          </h4>
          <p className="text-xs text-gray-500">
            Output trends and task completion indices.
          </p>
        </div>
        <TrendingUp className="h-5 w-5 text-teal-400" />
      </div>

      <div className="relative flex h-48 w-full flex-col justify-between rounded-2xl border border-white/5 bg-[#0B0F19] p-4">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-4 py-6 opacity-20">
          <div className="h-px bg-white" />
          <div className="h-px bg-white" />
          <div className="h-px bg-white" />
          <div className="h-px bg-white" />
        </div>

        <div className="relative z-10 flex h-full w-full items-end justify-between px-4 pb-2 pt-4">
          {weeklyData.map((data, index) => (
            <div
              key={data.day}
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              <span className="font-mono text-[10px] text-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {data.value}%
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${data.value * 1.1}px` }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="w-8 rounded-t-lg bg-gradient-to-t from-purple-500/20 to-teal-400 shadow-[0_0_10px_rgba(94,234,212,0.15)] transition-all duration-300 group-hover:to-teal-300 group-hover:shadow-[0_0_15px_rgba(94,234,212,0.3)]"
              />
              <span className="font-mono text-[10px] font-bold uppercase text-gray-500">
                {data.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
