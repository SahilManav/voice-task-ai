import { motion } from "framer-motion";
import { Mic, Plus } from "lucide-react";

import Button from "../common/Button";

const getGreetingName = (userName) => {
  if (!userName) {
    return "Alex";
  }

  return userName.split(" ")[0];
};

export default function DashboardHeader({
  userName,
  onOpenVoice,
  onOpenTaskModal,
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-extrabold tracking-tight text-white md:text-3xl"
        >
          Hello, {getGreetingName(userName)}
        </motion.h2>
        <p className="mt-1 text-sm text-gray-400">
          Let&apos;s tackle your priorities today. Ready for voice directives.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="md"
          icon={Plus}
          onClick={onOpenTaskModal}
        >
          Add Task
        </Button>
        <Button
          variant="primary"
          size="md"
          icon={Mic}
          onClick={onOpenVoice}
          className="shadow-[0_0_15px_rgba(94,234,212,0.25)]"
        >
          Start Recording
        </Button>
      </div>
    </div>
  );
}
