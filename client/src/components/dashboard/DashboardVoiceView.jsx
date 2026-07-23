import { Mic, Sparkles } from "lucide-react";

import Button from "../common/Button";
import RecentCommands from "./RecentCommands";
import VoicePromptsCard from "./VoicePromptsCard";

export default function DashboardVoiceView({
  isListening,
  transcript,
  aiResponse,
  recentCommands,
  onOpenVoice,
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            Voice Assistant Workspace
          </h2>
          <p className="text-sm text-gray-400">
            Capture commands, inspect transcripts, and confirm AI task drafts.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Mic} onClick={onOpenVoice}>
          {isListening ? "Recording..." : "Open Voice Panel"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-4 rounded-3xl border border-white/5 bg-[#141A29] p-6">
            <div className="flex items-center gap-2 text-teal-400">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-base font-bold text-white">
                Current Voice Snapshot
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-wider text-gray-500">
                  Speech Transcript Feed
                </p>
                <div className="min-h-[72px] rounded-xl border border-white/5 bg-[#0B0F19] p-4 text-sm text-gray-300">
                  {transcript || (
                    <span className="italic text-gray-600">
                      No active transcript yet. Open the voice panel to begin.
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[10px] uppercase tracking-wider text-gray-500">
                  AI Categorization Details
                </p>
                <div className="min-h-[96px] rounded-xl border border-white/5 bg-[#0B0F19] p-4 text-sm text-gray-300">
                  {aiResponse || (
                    <span className="italic text-gray-600">
                      Structured task details will appear here after speech
                      analysis.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <RecentCommands commands={recentCommands} />
        </div>

        <div className="space-y-6 lg:col-span-5">
          <VoicePromptsCard onOpenVoice={onOpenVoice} />
        </div>
      </div>
    </div>
  );
}
