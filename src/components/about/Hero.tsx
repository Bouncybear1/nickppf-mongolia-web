"use client";

import { motion } from "framer-motion";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";

export default function Hero() {
    return (
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-black text-white">
            {/* Background Image */}

            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
                    alt="NickPPF Workshop"
                    className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                        Дэлхийн хэмжээний чанар, <br className="hidden md:block" />
                        <span className="text-zinc-400">Монгол үйлчилгээ</span>
                    </h1>

                </motion.div>
            </div>
        </section>
    );
}
