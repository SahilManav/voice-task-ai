import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable FeatureCard component with glassmorphism and subtle glowing border hover effect.
 */
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative flex flex-col p-8 rounded-2xl bg-[#141A29]/60 backdrop-blur-xl border border-white/5 hover:border-teal-500/30 transition-colors duration-500 group overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glowing dot decorative element */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all duration-500" />

      {/* Icon Wrapper */}
      <div className="relative mb-6 p-4 w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/10 to-purple-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:text-teal-300 transition-colors duration-300 shadow-[0_0_15px_rgba(94,234,212,0.05)] group-hover:shadow-[0_0_20px_rgba(94,234,212,0.15)]">
        {Icon && <Icon className="w-6 h-6" />}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-teal-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
