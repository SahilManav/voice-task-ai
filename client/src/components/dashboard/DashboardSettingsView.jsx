import { useState } from "react";

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
      checked ? "bg-violet-500" : "bg-white/10"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

export default function DashboardSettingsView({
  icon: Icon,
  title,
  description,
  speechRate = 1,
  onSpeechRateChange,
}) {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [defaultPriority, setDefaultPriority] = useState("medium");
  const [darkTheme, setDarkTheme] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1 text-center">
        {Icon && <Icon className="mx-auto h-10 w-10 text-purple-400" />}
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/5 bg-[#141A29] p-6">
        <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
          Voice Preferences
        </h4>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-sm font-bold text-white">Voice Enabled</p>
            <p className="text-xs text-gray-500">
              Allow microphone-based commands
            </p>
          </div>
          <ToggleSwitch checked={voiceEnabled} onChange={setVoiceEnabled} />
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-sm font-bold text-white">Speech Rate</p>
            <p className="text-xs text-gray-500">
              How fast the assistant speaks back
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => onSpeechRateChange?.(Number(e.target.value))}
              className="w-32 accent-violet-400"
            />
            <span className="w-10 text-right font-mono text-xs text-violet-400">
              {speechRate.toFixed(1)}x
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/5 bg-[#141A29] p-6">
        <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
          Task Defaults
        </h4>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-sm font-bold text-white">Default Priority</p>
            <p className="text-xs text-gray-500">
              Used when a command doesn't specify one
            </p>
          </div>
          <select
            value={defaultPriority}
            onChange={(e) => setDefaultPriority(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0B0F19] px-3 py-1.5 text-xs font-bold uppercase text-white focus:border-violet-500/50 focus:outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/5 bg-[#141A29] p-6">
        <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
          Appearance &amp; Notifications
        </h4>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-sm font-bold text-white">Dark Theme</p>
            <p className="text-xs text-gray-500">
              Voice Task AI is currently dark-mode only
            </p>
          </div>
          <ToggleSwitch checked={darkTheme} onChange={setDarkTheme} />
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-sm font-bold text-white">Notifications</p>
            <p className="text-xs text-gray-500">
              Get notified about upcoming due dates
            </p>
          </div>
          <ToggleSwitch checked={notifications} onChange={setNotifications} />
        </div>
      </div>
    </div>
  );
}
