"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
    title: string;
    content: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}



function AccordionItem({ title, content, isOpen, onToggle }: AccordionItemProps) {
    return (
        <div className="mb-4 rounded-xl border border-white/10 bg-[#121212] overflow-hidden transition-colors">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between p-6 text-left transition-all"
            >
                <span className={cn("text-lg font-medium", isOpen ? "text-white" : "text-white")}>
                    {title}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4D23C] text-black">
                    {isOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <ArrowUp className="h-5 w-5 rotate-45 transform" />
                    )}
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-white/80 leading-relaxed font-medium">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface AccordionProps {
    items: {
        title: string;
        content: React.ReactNode;
    }[];
    allowMultiple?: boolean;
    className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        if (allowMultiple) {
            setOpenIndexes((prev) =>
                prev.includes(index)
                    ? prev.filter((i) => i !== index)
                    : [...prev, index]
            );
        } else {
            setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
        }
    };

    return (
        <div className={cn("w-full space-y-4", className)}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndexes.includes(index)}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
}
