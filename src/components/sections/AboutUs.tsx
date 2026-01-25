"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { ShieldCheck, Globe, Trophy, Headset } from "lucide-react";

// Feature Cards Data
const features = [
    {
        icon: ShieldCheck,
        title: "Premium Quality",
        description: "Our films are engineered with the highest grade materials for unmatched durability and clarity."
    },
    {
        icon: Globe,
        title: "Global Network",
        description: "With over 4,000 installation centers worldwide, consistent quality is guaranteed wherever you go."
    },
    {
        icon: Trophy,
        title: "Industry Leader",
        description: "Over 25 years of innovation and 20 million+ vehicles protected globally."
    },
    {
        icon: Headset,
        title: "Expert Support",
        description: "Our dedicated team enhances ownership experience with 24/7 technical and customer support."
    }
];

export default function AboutUs() {
    return (
        <section className="bg-zinc-950 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 flex flex-col gap-24">

                {/* Top Section: Image + Content */}
                <div className="flex flex-col lg:flex-row gap-16 items-stretch">

                    {/* Left: Image */}
                    {/* User Req: 1fr height (relative to container), 436px width, border-radius 8, border 1 white 0.1 opacity */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full lg:w-[436px] min-h-[400px] lg:min-h-full shrink-0 overflow-hidden rounded-[8px] border border-white/10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
                            alt="NickPPF Workshop"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>

                    {/* Right: Content */}
                    <div className="flex flex-col justify-center py-4">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <SectionSubtitle>
                                About NickPPF
                            </SectionSubtitle>
                            <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                                Our Legacy of Protection
                            </h2>
                            <div className="space-y-6 text-lg text-zinc-400 max-w-2xl">
                                <p>
                                    Founded in 1999, NickPPF has been at the forefront of automotive protection technology.
                                    We started with a simple mission: to preserve the beauty of every vehicle on the road.
                                </p>
                                <p>
                                    Over the last two decades, we have evolved from a small workshop to a global leader in
                                    Paint Protection Films, serving millions of car owners and partnering with thousands
                                    of installation centers worldwide.
                                </p>
                            </div>

                            <div className="mt-10">
                                <Button href="/about" variant="yellow">
                                    About Us
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: 4 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden flex flex-col items-start p-6 rounded-[8px] bg-zinc-900/50 border border-white/10 hover:bg-zinc-900 transition-colors"
                        >
                            {/* Decorative Box */}
                            <div className="absolute top-0 left-6 w-[40px] h-[4px] bg-black rounded-bl-[1px] rounded-br-[1px] transition-all duration-500 will-change-transform group-hover:w-[110px] group-hover:h-[64px] group-hover:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(244,210,60,0.4)_0%,rgba(244,210,60,0)_100%)] group-hover:blur-[12px] group-hover:rounded-full group-hover:opacity-100" />

                            <feature.icon className="relative z-10 h-8 w-8 text-[#F6BE00] mb-4" />
                            <h3 className="relative z-10 text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="relative z-10 text-sm text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
