import { motion } from "framer-motion";
import { Calendar, CheckCircle, Edit3, Trash2, Volume2 } from "lucide-react";

const priorityStyles = {
  high: {
    bg: "bg-red-500/10 border-red-500/30 text-red-400",
    dot: "bg-red-400",
    label: "High Priority",
  },
  medium: {
    bg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    dot: "bg-purple-400",
    label: "Medium Priority",
  },
  low: {
    bg: "bg-teal-500/10 border-teal-500/30 text-teal-400",
    dot: "bg-teal-400",
    label: "Low Priority",
  },
};
const delayedStyle = {
  bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  dot: "bg-amber-400",
  label: "Delayed",
};

const formatDueDate = (value) => {
  if (!value) {
    return "No deadline";
  }

  const rawValue = String(value);
  const parsedDate = new Date(rawValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return rawValue;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      parsedDate.getFullYear() === new Date().getFullYear()
        ? undefined
        : "numeric",
  });
};

export default function TaskCard({ task, onComplete, onEdit, onDelete }) {
  const {
    title,
    description,
    priority,
    dueDate,
    completed,
    voiceCommand,
    status,
    delayedUntil,
  } = task;

  const currentPriority =
    priorityStyles[priority?.toLowerCase()] ?? priorityStyles.low;
  const displayDescription =
    description || "No description provided yet.";

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className={`relative rounded-2xl border bg-[#141A29] p-5 transition-all duration-300 ${completed
          ? "border-white/5 opacity-60"
          : "border-white/5 hover:border-teal-500/30 hover:shadow-[0_0_20px_rgba(94,234,212,0.05)]"
        }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${currentPriority.bg}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${currentPriority.dot}`} />
          {currentPriority.label}
        </div>

        {voiceCommand && (
          <div className="inline-flex items-center gap-1 rounded-md border border-cyan-500/20 bg-[#0B0F19] px-2 py-1 font-mono text-[10px] text-cyan-400">
            <Volume2 className="h-3.5 w-3.5" />
            <span>Voice Tag</span>
          </div>
        )}

        {status === "delayed" && (
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${delayedStyle.bg}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${delayedStyle.dot}`} />
            {delayedStyle.label}
            {delayedUntil ? ` · ${formatDueDate(delayedUntil)}` : ""}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3
          className={`mb-1.5 text-base font-bold tracking-tight text-white ${completed ? "text-gray-500 line-through" : ""
            }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed text-gray-400 ${completed ? "text-gray-600 line-through" : ""
            }`}
        >
          {displayDescription}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-500" />
          <span className="font-mono text-gray-400">
            {formatDueDate(dueDate)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onComplete?.(task)}
            className={`rounded-lg p-1.5 transition-colors duration-300 hover:bg-white/5 ${completed
                ? "text-teal-400"
                : "text-gray-500 hover:text-teal-400"
              }`}
            title={completed ? "Mark Incomplete" : "Mark Complete"}
          >
            <CheckCircle className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => onEdit?.(task)}
            className="rounded-lg p-1.5 text-gray-500 transition-colors duration-300 hover:bg-white/5 hover:text-purple-400"
            title="Edit Task"
          >
            <Edit3 className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => onDelete?.(task)}
            className="rounded-lg p-1.5 text-gray-500 transition-colors duration-300 hover:bg-white/5 hover:text-red-400"
            title="Delete Task"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
