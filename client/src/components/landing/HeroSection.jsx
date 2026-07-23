import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, ArrowRight, Activity, Terminal, Shield } from 'lucide-react';
import Button from "../common/Button";

/**
 * Hero Section component for Landing Page.
 * Contains large futuristic headings, CTA buttons, and a React Three Fiber 3D Scene placeholder.
 */
const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden bg-[#0B0F19]">
      
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Title and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
          
          {/* AI Active Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider"
          >
            <Activity className="w-4.5 h-4.5 animate-pulse" />
            AI Voice Synthesis Active
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-sans"
          >
            Command Your Workflow. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-400">
              Hands-Free & Intelligent.
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl"
          >
            Experience the future of productivity. Speak to automatically create, prioritize, summarize, and manage tasks with high-fidelity voice recognition and glassmorphic dashboards.
          </motion.p>

          {/* Buttons / CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>

            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Login
              </Button>
            </Link>
          </motion.div>

          {/* Micro Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 w-full max-w-md"
          >
            <div>
              <p className="text-2xl font-bold text-teal-400">99.8%</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">&lt; 50ms</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Latency</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-300">10x</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Speed Gain</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: React Three Fiber Scene Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 w-full flex justify-center items-center"
        >
          <div className="w-full aspect-square max-w-[450px] lg:max-w-none h-96 sm:h-[450px] rounded-3xl border border-cyan-500/20 bg-[#141A29]/40 backdrop-blur-xl relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-[0_0_50px_rgba(94,234,212,0.05)]">
            
            {/* Future React Three Fiber Scene Placeholder Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#5eead40b_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Simulated Floating AI Waveform Visualizer */}
            <div className="relative w-48 h-48 rounded-full border border-teal-500/30 flex items-center justify-center group cursor-pointer">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping opacity-75" />
              {/* Mid glowing ring */}
              <div className="absolute -inset-4 rounded-full bg-teal-500/5 blur-md group-hover:bg-teal-500/10 transition-colors duration-500" />
              
              {/* Inner floating core */}
              <motion.div 
                animate={{
                  y: [0, -10, 0],
                  rotate: 360
                }}
                transition={{
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 25, ease: "linear" }
                }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-500/20 via-transparent to-purple-500/20 border border-teal-500/40 flex items-center justify-center shadow-[inset_0_0_20px_rgba(94,234,212,0.2)]"
              >
                <Mic className="w-12 h-12 text-teal-400 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
            </div>

            {/* Placeholder Text */}
            <div className="mt-8 text-center relative z-10">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                React Three Fiber Scene
              </h4>
              <p className="text-xs text-gray-500 max-w-[250px] mx-auto">
                Ready for a 3D Interactive Audio / Particle Waveform canvas.
              </p>
            </div>

            {/* Glowing borders */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400 rounded-br-3xl pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
