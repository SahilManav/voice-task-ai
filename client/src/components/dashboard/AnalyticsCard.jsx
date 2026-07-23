import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable AnalyticsCard component.
 * Displays statistics, progress indicators, or trend scores using a sleek glassmorphic card design.
 */
const AnalyticsCard = ({ 
  title, 
  value, 
  subtext, 
  icon: Icon, 
  accent = 'cyan', // 'cyan', 'purple', 'emerald', 'danger'
  progress = null,  // Number 0-100 for progress indicator circle
  trend = null     // Object: { value: '+12%', isPositive: true }
}) => {
  
  // Custom styling tokens based on accent color
  const accentClasses = {
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      stroke: '#5EEAD4',
      shadow: 'shadow-[0_0_15px_rgba(94,234,212,0.15)]'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      stroke: '#8B5CF6',
      shadow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]'
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      stroke: '#10B981',
      shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]'
    },
    danger: {
      text: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20',
      stroke: '#EF4444',
      shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.15)]'
    }
  };

  const currentAccent = accentClasses[accent] || accentClasses.cyan;

  // SVG Progress Ring calculations
  const radius = 24;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = progress !== null ? circumference - (progress / 100) * circumference : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl bg-[#141A29] border border-white/5 flex items-center justify-between shadow-lg relative overflow-hidden group"
    >
      {/* Decorative background glow */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${accent === 'cyan' ? 'bg-cyan-500' : 'bg-purple-500'}`} />

      {/* Text Info */}
      <div className="space-y-2">
        <span className="text-xs text-gray-500 uppercase font-mono tracking-wider">
          {title}
        </span>
        <h3 className="text-3xl font-extrabold text-white tracking-tight">
          {value}
        </h3>
        
        {/* Trend Indicator or Subtext */}
        {trend ? (
          <div className="flex items-center gap-1 text-xs">
            <span className={trend.isPositive ? 'text-emerald-400' : 'text-red-400'}>
              {trend.value}
            </span>
            <span className="text-gray-500">{subtext}</span>
          </div>
        ) : (
          subtext && <p className="text-xs text-gray-500 font-medium">{subtext}</p>
        )}
      </div>

      {/* Right Side: Graphic (Progress Ring or Icon) */}
      <div className="flex items-center justify-center shrink-0">
        {progress !== null ? (
          /* SVG Progress Ring Indicator */
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#1E293B"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Foreground animated progress circle */}
              <motion.circle
                cx="32"
                cy="32"
                r={radius}
                stroke={currentAccent.stroke}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-white font-mono">
              {progress}%
            </span>
          </div>
        ) : (
          /* Large Glowing Icon wrapper */
          Icon && (
            <div className={`p-3.5 rounded-xl border flex items-center justify-center text-teal-400 ${currentAccent.bg} ${currentAccent.shadow} ${currentAccent.text}`}>
              <Icon className="w-6 h-6" />
            </div>
          )
        )}
      </div>

    </motion.div>
  );
};

export default AnalyticsCard;
