import React from 'react';
import { Shield, Cpu, Terminal, Mic } from 'lucide-react';

/**
 * Reusable Footer component with futuristic accents and copyright disclaimer.
 */
const Footer = () => {
  return (
    <footer className="w-full bg-[#0B0F19] border-t border-white/5 py-12 px-6 relative overflow-hidden">
      {/* Background glow mesh */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-purple-600 flex items-center justify-center text-[#0B0F19]">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-white tracking-wider text-lg">VOX<span className="text-teal-400">AI</span></span>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase">Task Engine</p>
          </div>
        </div>

        {/* Center: System Status */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <Shield className="w-4 h-4 text-teal-400" />
            <span className="text-xs">End-to-End Encryption</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-xs">v1.0.0 Core API</span>
          </div>
        </div>

        {/* Right Side: Copyright */}
        <div className="text-right text-xs text-gray-500 flex flex-col items-center md:items-end gap-1">
          <p>© {new Date().getFullYear()} VoxAI Technologies. All rights reserved.</p>
          <p className="font-mono text-[10px] text-gray-600 uppercase">SYS SECURE // SEC-GRID-09</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
