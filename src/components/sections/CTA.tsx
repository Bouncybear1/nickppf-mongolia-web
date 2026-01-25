"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CTA() {
    return (
        <section className="relative overflow-hidden py-32 text-center text-white">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop"
                    alt="Luxury Car"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="relative z-20 mx-auto max-w-4xl px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full text-4xl font-medium md:text-6xl"
                >
                    Мэргэжлийн багтай холбогдож, зөв шийдлээ тодорхойлоорой
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-10"
                >
                    <Button
                        href="/consultation"
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
