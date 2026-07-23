import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Mic, Moon, Search, Settings, Sun, User } from "lucide-react";

const getInitials = (name) => {
  if (!name) {
    return "AM";
  }

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
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const initials = getInitials(userName);

  return (
    <header className="sticky top-0 right-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#141A29]/80 px-6 backdrop-blur-md">
      <div className="relative max-w-md flex-1">
        <div
          className={`relative flex items-center rounded-xl border bg-[#0B0F19] transition-all duration-300 ${
            searchFocused
              ? "border-teal-500/50 shadow-[0_0_15px_rgba(94,234,212,0.15)]"
              : "border-white/5"
          }`}
        >
          <Search className="absolute left-4 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks, tags, or voice transcripts..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="h-10 w-full bg-transparent pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          onClick={onMicClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 p-2.5 text-teal-400 transition-all duration-300 hover:bg-teal-500/20 hover:text-teal-300 hover:shadow-[0_0_15px_rgba(94,234,212,0.3)]"
          title="Open Voice Assistant Panel"
        >
          <Mic className="h-5 w-5 animate-pulse" />
        </motion.button>

        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center justify-center rounded-xl border border-white/5 bg-[#0B0F19] p-2.5 text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
        >
          {isDark ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>

        <div className="relative">
          <button className="flex items-center justify-center rounded-xl border border-white/5 bg-[#0B0F19] p-2.5 text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-purple-500" />
          </button>
        </div>

        <div className="h-6 w-px bg-white/10" />

        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-9 rounded-xl bg-gradient-to-tr from-teal-400 to-purple-600 p-0.5 shadow-[0_0_10px_rgba(94,234,212,0.15)] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#141A29] text-sm font-bold text-white">
                {initials}
              </div>
            </div>
            <div className="hidden flex-col text-left sm:flex">
              <span className="text-xs font-bold text-white transition-colors duration-300 group-hover:text-teal-300">
                {userName}
              </span>
              <span className="text-[10px] text-gray-500">Workspace Owner</span>
            </div>
          </button>

          <AnimatePresence>
            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setProfileDropdownOpen(false)}
                />

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
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-400 transition-colors duration-300 hover:bg-white/5 hover:text-white">
                      <User className="h-4 w-4 text-teal-400" />
                      My Profile
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-400 transition-colors duration-300 hover:bg-white/5 hover:text-white">
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
  );
}
