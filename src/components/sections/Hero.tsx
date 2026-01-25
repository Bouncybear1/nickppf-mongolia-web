"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { WordFadeIn } from "../ui/WordFadeIn";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white">
            {/* Background Video Placeholder */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                {/* Replace src with actual video or use an Image component */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    poster="/hero-poster.jpg"
                >
                    {/* <source src="/hero-video.mp4" type="video/mp4" /> */}
                </video>
                {/* Fallback pattern if no video */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            </div>

            <div className="relative z-20 flex h-full flex-col justify-end items-start pb-[40px] pl-[40px]">
                <WordFadeIn
                    words="Автомашины"
                    className="text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl text-left"
                    delay={0}
                />

                <WordFadeIn
                    words="хамгаалалтын төгс шийдэл"
                    className="text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl text-left mt-2"
                    delay={0.2}
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
