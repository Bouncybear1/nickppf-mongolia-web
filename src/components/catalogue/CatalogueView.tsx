"use client";

import { motion } from "framer-motion";
import { WordFadeIn } from "@/components/ui/WordFadeIn";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import { Catalogue, getDirectusFileUrl } from "@/lib/directus";

interface CatalogueViewProps {
    items: Catalogue[];
}

export default function CatalogueView({ items }: CatalogueViewProps) {
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
                    {items.map((item, index) => {
                        const fileUrl = item.catalogue_file ? getDirectusFileUrl(item.catalogue_file) : item.Catalogue_url;
                        const isFile = !!item.catalogue_file;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative flex flex-col w-full aspect-[1/2] overflow-hidden rounded-lg"
                            >
                                {/* Image Container - Fills remaining space */}
                                <div className="relative flex-1 w-full overflow-hidden">
                                    <Image
                                        src={getDirectusFileUrl(item.catalogue_image)}
                                        alt={item.Title}
                                        fill
                                        className="object-cover transition-transform duration-700 opacity-80 group-hover:opacity-60 rounded-lg"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                                    {/* Hover Overlay with Button */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <Button
                                            variant="yellow"
                                            className="gap-2 px-8 py-6 text-lg font-bold rounded-full scale-90 group-hover:scale-100 transition-transform duration-300"
                                            icon={isFile ? <Download className="w-6 h-6 translate-x-0 rotate-[-45deg]" /> : <ExternalLink className="w-6 h-6 translate-x-0" />}
                                            href={fileUrl || "#"}
                                            target="_blank"
                                        >
                                            {isFile ? "Татах" : "Үзэх"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Title Section - Fixed at bottom of flex container */}
                                <div className="w-full p-6 z-10">
                                    <h3 className="text-lg font-medium text-white line-clamp-2 tracking-[0.02em]">
                                        {item.Title}
                                    </h3>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
