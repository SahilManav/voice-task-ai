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

/**
 * Collapsible, responsive Sidebar navigation component.
 * Uses Framer Motion for premium width expansion.
 */
const Sidebar = ({ activeTab, onTabChange, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-teal-400' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, color: 'text-purple-400' },
    { id: 'voice', label: 'Voice Assistant', icon: Mic, color: 'text-cyan-400' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, color: 'text-emerald-400' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-indigo-400' },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? '72px' : '260px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:flex flex-col h-screen bg-[#141A29] border-r border-white/5 relative z-30 shrink-0"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-purple-600 flex items-center justify-center text-[#0B0F19]">
              <Mic className="w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-white tracking-wider text-base">
              VOX<span className="text-teal-400">AI</span>
            </span>
          </motion.div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-teal-400 to-purple-600 flex items-center justify-center text-[#0B0F19]">
            <Mic className="w-4 h-4" />
          </div>
        )}

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#141A29] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-500/30 transition-colors shadow-md focus:outline-none"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center rounded-xl p-3 text-sm font-semibold transition-all duration-300 group focus:outline-none relative ${
                isActive 
                  ? 'bg-gradient-to-r from-teal-500/10 to-purple-500/10 border border-teal-500/20 text-white shadow-[0_0_15px_rgba(94,234,212,0.05)]' 
                  : 'text-gray-400 border border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              {/* Active neon highlight vertical bar */}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-teal-400"
                />
              )}

              {/* Icon */}
              <div className={`${isCollapsed ? 'mx-auto' : 'mr-3'} transition-all ${isActive ? 'text-teal-300' : 'text-gray-400 group-hover:text-white'}`}>
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Label */}
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Action Area */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={onLogout}
          className="w-full flex items-center rounded-xl p-3 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-300 group focus:outline-none"
        >
          <div className={isCollapsed ? 'mx-auto' : 'mr-3'}>
            <LogOut className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              Logout Session
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
