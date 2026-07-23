import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, FileText, Flag, PlusSquare, Type, X } from "lucide-react";

import Button from "../common/Button";

const initialFormState = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
  task,
  isSubmitting,
}) {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (!isOpen) return;

    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setForm(initialFormState);
    }
  }, [isOpen, task]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate || null,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#141A29] p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-300">
                  <PlusSquare className="h-3.5 w-3.5" />
                  {task ? "Edit Task" : "Create Task"}
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  {task ? "Edit Task" : "Add a new task"}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {task
                    ? "Update the task details below."
                    : "Capture a task with a title, optional notes, and a deadline."}
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-[#0B0F19] p-2 text-gray-400 transition-colors duration-300 hover:text-white"
                aria-label="Close create task modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Type className="h-4 w-4 text-teal-400" />
                    Task title
                  </span>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="Finish engineering assignment"
                    className="h-12 w-full rounded-2xl border border-white/10 bg-[#0B0F19] px-4 text-sm text-white placeholder-gray-500 outline-none transition-colors duration-300 focus:border-teal-400"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <FileText className="h-4 w-4 text-purple-400" />
                    Description
                  </span>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Add extra context or notes for this task..."
                    className="w-full rounded-2xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors duration-300 focus:border-teal-400"
                  />
                </label>

                <label className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Flag className="h-4 w-4 text-red-400" />
                    Priority
                  </span>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="h-12 w-full rounded-2xl border border-white/10 bg-[#0B0F19] px-4 text-sm text-white outline-none transition-colors duration-300 focus:border-teal-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    Due date
                  </span>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="h-12 w-full rounded-2xl border border-white/10 bg-[#0B0F19] px-4 text-sm text-white outline-none transition-colors duration-300 focus:border-teal-400"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/5 pt-4 sm:flex-row sm:justify-end">
                <Button
                  variant="ghost"
                  className="sm:min-w-32"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="sm:min-w-40"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? task
                      ? "Updating..."
                      : "Creating..."
                    : task
                      ? "Update Task"
                      : "Create Task"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
