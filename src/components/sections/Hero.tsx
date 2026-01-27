"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { WordFadeIn } from "../ui/WordFadeIn";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Overlay - Black at bottom fading to transparent at top */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                {/* Video Element */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    poster="/hero-bg.avif"
                >
                    <source src="/amblpk5xet4w.webm" type="video/webm" />
                </video>
            </div>

            <div className="relative z-20 mx-auto flex h-full max-w-[1440px] flex-col justify-end items-start px-6 pb-20 md:pb-[40px]">
                <WordFadeIn
                    words="Автомашины"
                    className="text-4xl font-medium tracking-tight md:text-7xl lg:text-8xl text-left text-white"
                    delay={0}
                />

                <WordFadeIn
                    words="хамгаалалтын төгс шийдэл"
                    className="text-4xl font-medium tracking-tight md:text-7xl lg:text-8xl text-left mt-2 text-zinc-400"
                    delay={0.3}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-10"
                >
                    <Button
                        href="/contact"
                        variant="yellow"
                        className="text-lg px-8 py-4 font-medium"
                    >
                        Зөвлөгөө авах
                    </Button>
                </motion.div>
            </div>


        </section>
    );
}
