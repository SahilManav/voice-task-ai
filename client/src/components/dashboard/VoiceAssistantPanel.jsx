import { motion } from 'framer-motion';
import { Mic, MicOff, Sparkles, Check, X } from 'lucide-react';
import Button from "../common/Button";

/**
 * VoiceAssistantPanel UI component.
 * Features clean SVG acoustic soundwaves, stateful mic button indicators,
 * transcript areas, AI response panels, and action controllers.
 */
const VoiceAssistantPanel = ({
  isListening = false,
  onMicToggle,
  transcript = "",
  parsedCommand = null,
  onConfirm,
  onCancel,
  className = ""
}) => {
  return (
    <div className={`p-6 rounded-3xl bg-[#141A29] border border-white/5 shadow-2xl flex flex-col justify-between h-full ${className}`}>

      {/* Head section */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">Voice Synthesizer</span>
        </div>

        {/* Status indicator */}
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0B0F19] border border-white/5 text-[9px] font-mono font-bold tracking-widest uppercase">
          <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-red-400 animate-pulse' : 'bg-gray-600'}`} />
          {isListening ? 'Listening' : 'Standby'}
        </div>
      </div>

      {/* Recording Waveform Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-[160px]">
        <div className="relative mb-6">
          {/* Glowing background circles for recording indicator */}
          {isListening && (
            <>
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full bg-teal-500/10 blur-xl pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-purple-500/5 blur-2xl pointer-events-none"
              />
            </>
          )}

          {/* Large Mic Toggle Button */}
          <motion.button
            onClick={onMicToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border relative z-10 transition-colors duration-300 ${isListening
              ? 'bg-red-500/20 border-red-500/40 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
              : 'bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
              }`}
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </motion.button>
        </div>

        {/* Dynamic Waveform Graph (Pure SVG) */}
        <div className="h-10 w-full flex items-center justify-center gap-1 overflow-hidden px-4">
          {isListening ? (
            /* Animated lines mimicking sound level feed */
            [40, 60, 20, 80, 50, 90, 30, 70, 40, 60, 80, 30, 50, 70, 20, 90].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${h / 3}px`, `${h}px`, `${h / 3}px`] }}
                transition={{ repeat: Infinity, duration: 0.8 + (i % 3) * 0.1, ease: 'easeInOut' }}
                className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-violet-400' : 'bg-purple-500'}`}
              />
            ))
          ) : (
            /* Idle wave view */
            Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-gray-700"
              />
            ))
          )}
        </div>
      </div>

      {/* Text Logs (Transcript & AI Extract Output) */}
      <div className="space-y-4 mb-6">

        {/* Transcript Box */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Speech Transcript Feed</span>
          <div className="bg-[#0B0F19] rounded-xl p-3 border border-white/5 text-sm text-gray-300 min-h-[50px] font-sans">
            {transcript ? (
              transcript
            ) : (
              <div className="space-y-2 text-gray-500 text-sm">
                <p className="italic">Try saying:</p>

                <p>🎤 Create task submit assignment tomorrow</p>

                <p>🎤 Complete React assignment</p>

                <p>🎤 Delete grocery task</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Parameter extraction output */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">AI Categorization Details</span>
          <div className="bg-[#0B0F19]/50 rounded-xl p-4 border border-white/5 text-sm font-sans min-h-[60px]">
            {parsedCommand ? (
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-[9px] font-mono uppercase tracking-wider text-gray-500">
                    Last Voice Command
                  </p>
                  <p className="text-sm font-bold text-white">
                    {parsedCommand.title || "-"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-3">
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-gray-500">
                      Status
                    </p>
                    <p className="flex items-center gap-1 text-xs font-bold text-violet-400">
                      <Check className="h-3 w-3" /> Parsed
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-gray-500">
                      Action
                    </p>
                    <p className="text-xs font-bold uppercase text-white">
                      {parsedCommand.action}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-gray-500">
                      Priority
                    </p>
                    <p className="text-xs font-bold capitalize text-white">
                      {parsedCommand.priority}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-gray-500">
                      Due
                    </p>
                    <p className="text-xs font-bold text-white">
                      {parsedCommand.dueDate
                        ? new Date(parsedCommand.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                        : "None"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <span className="text-gray-600 italic text-sm">Parameters will show here after speaking...</span>
            )}
          </div>
        </div>

      </div>

      {/* Action Dialog Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="flex-1"
          icon={X}
        >
          Discard
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onConfirm}
          className="flex-1"
          icon={Check}
        >
          Confirm Task
        </Button>
      </div>

    </div>
  );
};

export default VoiceAssistantPanel;
