import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Mic, Moon, Search, Settings, Sun, User } from "lucide-react";
import toast from "react-hot-toast";

const getInitials = (name) => {
  if (!name) return "AM";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
};

export default function Navbar({
  onMicClick,
  onLogout,
  userName = "Alex Mercer",
  userEmail = "alex.mercer@vox.ai",
  tasks = [],
  onSearch,
  onNavigate,
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const initials = getInitials(userName);

  // Get upcoming tasks (due within 3 days)
  const upcomingTasks = tasks.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    const diff = (new Date(t.dueDate) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  });

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch?.(val);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    toast("Light mode coming soon! The app is currently dark-mode only.", {
      icon: "🌙",
      style: {
        background: "#141A29",
        color: "#fff",
        border: "1px solid rgba(139,92,246,0.3)",
      },
    });
  };

  return (
    <>
    <header className="sticky top-0 right-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#141A29]/80 px-6 backdrop-blur-md">
      {/* Search Bar */}
      <div className="relative max-w-md flex-1">
        <div
          className={`relative flex items-center rounded-xl border bg-[#0B0F19] transition-all duration-300 ${
            searchFocused
              ? "border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
              : "border-white/5"
          }`}
        >
          <Search className="absolute left-4 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks, tags, or voice transcripts..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="h-10 w-full bg-transparent pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); onSearch?.(""); }}
              className="absolute right-3 text-gray-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Mic Button */}
        <motion.button
          onClick={onMicClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 p-2.5 text-violet-400 transition-all duration-300 hover:bg-violet-500/20 hover:text-violet-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          title="Open Voice Assistant"
        >
          <Mic className="h-5 w-5 animate-pulse" />
        </motion.button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={handleThemeToggle}
          className="flex items-center justify-center rounded-xl border border-white/5 bg-[#0B0F19] p-2.5 text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
          title="Toggle theme"
        >
          {isDark ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>

        {/* Bell / Notifications */}
        <div className="relative">
          <button
            onClick={() => { setBellOpen(!bellOpen); setProfileDropdownOpen(false); }}
            className="flex items-center justify-center rounded-xl border border-white/5 bg-[#0B0F19] p-2.5 text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {upcomingTasks.length > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500" />
            )}
          </button>

          <AnimatePresence>
            {bellOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setBellOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-40 mt-3 w-72 rounded-2xl border border-white/5 bg-[#141A29] p-3 shadow-2xl"
                >
                  <div className="border-b border-white/5 pb-2 mb-2">
                    <p className="text-sm font-bold text-white">Notifications</p>
                  </div>

                  {upcomingTasks.length > 0 ? (
                    <div className="space-y-2">
                      {upcomingTasks.map((task) => {
                        const daysLeft = Math.ceil(
                          (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
                        );
                        return (
                          <div
                            key={task._id}
                            className="rounded-xl bg-violet-500/10 border border-violet-500/20 px-3 py-2"
                          >
                            <p className="text-xs font-semibold text-white truncate">{task.title}</p>
                            <p className="text-[10px] text-violet-400 mt-0.5">
                              Due in {daysLeft === 0 ? "today" : `${daysLeft} day${daysLeft > 1 ? "s" : ""}`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-4 text-center">
                      <p className="text-2xl mb-1">🎉</p>
                      <p className="text-sm text-gray-400">All caught up!</p>
                      <p className="text-xs text-gray-600 mt-0.5">No tasks due in the next 3 days</p>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-px bg-white/10" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setBellOpen(false); }}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-9 rounded-xl bg-gradient-to-tr from-violet-500 to-purple-600 p-0.5 shadow-[0_0_10px_rgba(139,92,246,0.15)] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#141A29] text-sm font-bold text-white">
                {initials}
              </div>
            </div>
            <div className="hidden flex-col text-left sm:flex">
              <span className="text-xs font-bold text-white transition-colors duration-300 group-hover:text-violet-300">
                {userName}
              </span>
              <span className="text-[10px] text-gray-500">Workspace Owner</span>
            </div>
          </button>

          <AnimatePresence>
            {profileDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setProfileDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-40 mt-3 w-56 rounded-2xl border border-white/5 bg-[#141A29] p-2 shadow-2xl"
                >
                  <div className="border-b border-white/5 p-3">
                    <p className="text-sm font-bold text-white">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </div>

                  <div className="space-y-1 py-2">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onNavigate?.("settings");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-400 transition-colors duration-300 hover:bg-white/5 hover:text-white">
                      <User className="h-4 w-4 text-violet-400" />
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setAccountModalOpen(true);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-400 transition-colors duration-300 hover:bg-white/5 hover:text-white">
                      <Settings className="h-4 w-4 text-purple-400" />
                      Account Settings
                    </button>
                  </div>

                  <div className="my-1 h-px bg-white/5" />

                  <div className="p-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout?.();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 transition-colors duration-300 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout Session
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>

    {/* Account Settings Modal */}
    <AnimatePresence>
      {accountModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAccountModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/80 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#141A29] p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-violet-500/30">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{userName}</p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setAccountModalOpen(false)}
                className="rounded-xl border border-white/10 bg-[#0B0F19] p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Account Info */}
            <div className="space-y-3 rounded-2xl border border-white/5 bg-[#0B0F19]/50 p-4 mb-4">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">Account Details</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Full Name</span>
                  <span className="text-xs font-semibold text-white">{userName}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Email</span>
                  <span className="text-xs font-semibold text-white">{userEmail}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Account Type</span>
                  <span className="text-xs font-semibold text-violet-400">Workspace Owner</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
                  </span>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="text-xs text-gray-500 text-center mb-4">
              To update preferences, visit{" "}
              <button
                onClick={() => { setAccountModalOpen(false); onNavigate?.("settings"); }}
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Settings
              </button>
            </p>

            {/* Logout */}
            <button
              onClick={() => { setAccountModalOpen(false); onLogout?.(); }}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-colors duration-300"
            >
              <LogOut className="h-4 w-4" />
              Logout Session
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
