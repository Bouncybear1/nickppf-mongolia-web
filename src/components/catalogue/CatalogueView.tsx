"use client";

import { motion } from "framer-motion";
import { WordFadeIn } from "@/components/ui/WordFadeIn";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Download } from "lucide-react";

// Mock Data
const CATALOGUE_ITEMS = [
    {
        id: 1,
        title: "PPF Product Guide 2024",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop",
        file: "/files/catalogue-1.pdf" // Placeholder path
    },
    {
        id: 2,
        title: "Ceramic Coating Brochure",
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
        file: "/files/catalogue-2.pdf"
    },
    {
        id: 3,
        title: "Window Tint Specifications",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
        file: "/files/catalogue-3.pdf"
    },
    {
        id: 4,
        title: "Detailing Services Menu",
        image: "https://images.unsplash.com/photo-1605218427306-02224b69a3b3?q=80&w=1974&auto=format&fit=crop",
        file: "/files/catalogue-4.pdf"
    },
    {
        id: 5,
        title: "Warranty Information",
        image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop",
        file: "/files/catalogue-5.pdf"
    },
];

export default function CatalogueView() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] flex flex-col justify-end items-start overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
                        alt="Catalogue Hero"
                        className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                </div>

                <div className="relative z-20 w-full max-w-[1440px] mx-auto flex flex-col justify-end items-start px-6 pb-20 md:pb-[40px]">
                    <WordFadeIn
                        words="NickPPF Каталог"
                        className="text-4xl font-medium tracking-tight md:text-7xl lg:text-8xl text-left text-white"
                        delay={0}
                    />
                </div>
            </div>

            {/* Catalogue Grid Section */}
            <div className="max-w-[1600px] mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATALOGUE_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative flex flex-col w-full aspect-[1/2] overflow-hidden rounded-lg bg-zinc-900 border border-white/5"
                        >
                            {/* Image Container - Fills remaining space */}
                            <div className="relative flex-1 w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                                {/* Hover Overlay with Button */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                    <Button
                                        variant="yellow"
                                        className="gap-2 px-8 py-6 text-lg font-bold rounded-full scale-90 group-hover:scale-100 transition-transform duration-300"
                                        icon={<Download className="w-6 h-6 translate-x-0 rotate-[-45deg]" />}
                                    >
                                        Татах
                                    </Button>
                                </div>
                            </div>

                            {/* Title Section - Fixed at bottom of flex container */}
                            <div className="w-full p-6 bg-zinc-900 z-10">
                                <h3 className="text-xl font-medium text-white line-clamp-2 uppercase leading-snug">
                                    {item.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
