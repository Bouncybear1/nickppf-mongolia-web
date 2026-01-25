"use client";

import { cn } from "@/lib/utils";

interface SectionSubtitleProps {
    children: React.ReactNode;
    className?: string;
}

export function SectionSubtitle({ children, className }: SectionSubtitleProps) {
    return (
        <div className={cn("flex items-center gap-3 mb-4", className)}>
            {/* Yellow Box */}
            <div className="h-[6px] w-[6px] bg-[#F4D23C] rounded-[2px]" />

            {/* Text */}
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF]/72 font-mono font-weight-500">
                {children}
            </span>
        </div>
    );
}
