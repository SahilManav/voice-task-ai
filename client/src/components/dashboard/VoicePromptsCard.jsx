import { Mic, Volume2 } from "lucide-react";

import Button from "../common/Button";

export default function VoicePromptsCard({ onOpenVoice }) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/5 bg-[#141A29] p-5">
      <div className="flex items-center gap-2 text-violet-400">
        <Volume2 className="h-5 w-5" />
        <h4 className="text-sm font-bold text-white">Voice Command Prompts</h4>
      </div>
      <p className="text-xs leading-relaxed text-gray-400">
        Capture items by speaking naturally. Use triggers like "priority high",
        "deadline friday", or "complete task".
      </p>
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        icon={Mic}
        onClick={onOpenVoice}
      >
        Configure Feed
      </Button>
    </div>
  );
}
