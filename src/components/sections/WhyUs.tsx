"use client";

import { motion } from "framer-motion";
import { Globe, TrendingUp, ShieldCheck, Wrench, Award, Users } from "lucide-react";

const benefits = [
    {
        icon: Globe,
        title: "Global Service",
        description: "A worldwide network ensuring consistent quality and support wherever you are."
    },
    {
        icon: TrendingUp,
        title: "Marketing Support",
        description: "We help our partners grow with comprehensive digital and physical marketing assets."
    },
    {
        icon: ShieldCheck,
        title: "Technical Support",
        description: "24/7 expert assistance to resolve any installation or product queries instantly."
    },
    {
        icon: Wrench,
        title: "Training Academy",
        description: "Hands-on training programs to master the art of PPF application."
    },
    {
        icon: Award,
        title: "Premium Quality",
        description: "Materials tested in extreme conditions to guarantee durability and clarity."
    },
    {
        icon: Users,
        title: "Community",
        description: "Join a passionate community of detailers and car enthusiasts."
    }
];

export default function WhyUs() {
    return (
        <section className="bg-zinc-900 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold md:text-5xl"
                    >
                        Why Choose NickPPF?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-zinc-400"
                    >
                        We go beyond just products to provide a complete ecosystem for success.
                    </motion.p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group flex flex-col items-center text-center rounded-2xl bg-zinc-950 p-8 transition-all hover:bg-zinc-800"
                        >
                            <div className="mb-6 rounded-full bg-zinc-900 p-4 text-white group-hover:bg-white group-hover:text-black transition-colors">
                                <benefit.icon className="h-8 w-8" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">{benefit.title}</h3>
                            <p className="text-sm text-zinc-400">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
