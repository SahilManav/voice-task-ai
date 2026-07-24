import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Mic, 
  BarChart2, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, onTabChange, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────── */}
      <motion.aside
        animate={{ width: isCollapsed ? '72px' : '260px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col h-screen bg-[#141A29] border-r border-white/5 relative z-30 shrink-0"
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
                <Mic className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white tracking-wider text-base">
                Voice<span className="text-violet-400">Desk</span>
              </span>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
              <Mic className="w-4 h-4" />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#141A29] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors shadow-md focus:outline-none"
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center rounded-xl p-3 text-sm font-semibold transition-all duration-300 group focus:outline-none relative ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-white'
                    : 'text-gray-400 border border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div layoutId="activeIndicator"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-violet-400"
                  />
                )}
                <div className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${isActive ? 'text-violet-300' : 'text-gray-400 group-hover:text-white'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {!isCollapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="truncate">
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center rounded-xl p-3 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-300 focus:outline-none"
          >
            <div className={isCollapsed ? 'mx-auto' : 'mr-3'}>
              <LogOut className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
                Logout Session
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* ── Mobile Bottom Navigation Bar ────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141A29]/95 backdrop-blur-xl border-t border-white/5 px-2 pb-safe">
        <div className="flex items-center justify-around h-16">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center justify-center gap-1 flex-1 h-full focus:outline-none relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-violet-400"
                  />
                )}
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'text-gray-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-violet-400' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Logout button on mobile */}
          <button
            onClick={onLogout}
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full focus:outline-none"
          >
            <div className="p-1.5 rounded-xl text-red-500 transition-all duration-200">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-red-500">Logout</span>
          </button>
        </div>
      </nav>

      {/* Bottom padding spacer on mobile so content isn't hidden behind nav */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default Sidebar;
