"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface LegalLayoutProps {
  children: ReactNode;
  icon: ReactNode;
  title: string;
  subtitle: string;
  accentTheme?: "cyan" | "purple" | "pink" | "green";
}

export function LegalLayout({ 
  children, 
  icon, 
  title, 
  subtitle,
  accentTheme = "cyan"
}: LegalLayoutProps) {
  
  const themeStyles = {
    cyan: {
      shadow: "shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      border: "border-[#06B6D4]/30",
      bgHover: "hover:bg-[#06B6D4]/10",
      text: "text-[#06B6D4]",
      glow1: "bg-[#06B6D4]/5",
      glow2: "bg-[#8B5CF6]/5",
      glowText: "glow-text"
    },
    purple: {
      shadow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
      border: "border-[#8B5CF6]/30",
      bgHover: "hover:bg-[#8B5CF6]/10",
      text: "text-[#8B5CF6]",
      glow1: "bg-[#8B5CF6]/5",
      glow2: "bg-[#06B6D4]/5",
      glowText: "text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
    },
    pink: {
      shadow: "shadow-[0_0_30px_rgba(236,72,153,0.15)]",
      border: "border-[#EC4899]/30",
      bgHover: "hover:bg-[#EC4899]/10",
      text: "text-[#EC4899]",
      glow1: "bg-[#EC4899]/5",
      glow2: "bg-[#8B5CF6]/5",
      glowText: "text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]"
    },
    green: {
      shadow: "shadow-[0_0_30px_rgba(34,197,94,0.15)]",
      border: "border-[#22C55E]/30",
      bgHover: "hover:bg-[#22C55E]/10",
      text: "text-[#22C55E]",
      glow1: "bg-[#22C55E]/5",
      glow2: "bg-[#06B6D4]/5",
      glowText: "text-white drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
    }
  };

  const activeTheme = themeStyles[accentTheme];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden font-poppins selection:bg-[#06B6D4]/30 selection:text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-[#050816]"></div>
      <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Ambient Glows */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${activeTheme.glow1} blur-[120px] rounded-full pointer-events-none mix-blend-screen`}></div>
      <div className={`absolute top-40 left-[-200px] w-[500px] h-[500px] ${activeTheme.glow2} blur-[120px] rounded-full pointer-events-none mix-blend-screen`}></div>

      <div className="max-w-4xl lg:max-w-5xl mx-auto relative z-10">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-16"
        >
          <div className={`w-20 h-20 rounded-2xl bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center border ${activeTheme.border} ${activeTheme.shadow} mb-8 relative group overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent`}></div>
            <div className={`absolute inset-0 ${activeTheme.bgHover} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className={`relative z-10 ${activeTheme.text} group-hover:scale-110 transition-transform duration-500`}>
               {icon}
            </div>
          </div>
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-orbitron font-black uppercase tracking-[0.15em] mb-6 ${activeTheme.glowText}`}>
             {title}
          </h1>
          <p className="text-[#9CA3AF] text-sm md:text-base lg:text-lg max-w-2xl font-medium tracking-[0.2em] uppercase leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
