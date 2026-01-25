"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

            <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl font-sans"
                >
                    The Perfect Automotive Protection Solution.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl"
                >
                    Premium Paint Protection Film & Detailing Services for the most demanding car owners.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-10"
                >
                    <Button
                        href="/contact"
                        variant="yellow"
                        className="text-lg px-8 py-4 font-bold"
                    >
                        Get Advice
                    </Button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
                    <div className="h-1.5 w-full animate-bounce rounded-full bg-white" />
                </div>
            </motion.div>
        </section>
    );
}
