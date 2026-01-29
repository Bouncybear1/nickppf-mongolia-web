"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    delay?: number;
    className?: string; // Allow passing extra classes like h-full for grid consistency
}

export default function FeatureCard({ title, description, icon: Icon, delay = 0, className = "" }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`group relative overflow-hidden flex flex-col items-start p-6 rounded-[8px] bg-[#0F0F0F] border border-black transition-colors shadow-[inset_0_2px_2px_rgba(255,255,255,0.08)] ${className}`}
        >
            {/* Decorative Box */}
            <div className="absolute top-[-30px] left-[-11px] w-[110px] h-[64px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(50%_50%_at_50%_50%,#F4D23C_0%,rgba(244,210,60,0)_100%)] blur-[12px] pointer-events-none" />
            <div className="absolute top-0 left-6 w-[40px] h-[4px] bg-[#2A2A2A] rounded-bl-[3px] rounded-br-[3px] transition-colors duration-500 group-hover:bg-[#F4D23C]" />

            {Icon && <Icon className="relative z-10 h-8 w-8 text-[#F6BE00] mb-4" />}
            <h3 className="relative z-10 text-xl font-bold text-white mb-2">{title}</h3>
            <p className="relative z-10 text-sm text-zinc-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
