"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { ArrowRight } from "lucide-react";

// Mock Data
const articles = [
    {
        id: 1,
        title: "The Evolution of Paint Protection Film",
        excerpt: "From military applications to luxury cars, see how PPF technology has changed.",
        date: "Oct 12, 2025",
        image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Ceramic Coating vs. PPF: Which is Right for You?",
        excerpt: "Understanding the key differences and benefits of each protection method.",
        date: "Nov 05, 2025",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "NickPPF Expands to European Market",
        excerpt: "We are proud to announce our new distribution centers opening in Germany and France.",
        date: "Dec 01, 2025",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function Articles() {
    return (
        <section className="bg-zinc-950 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <SectionSubtitle>News & Updates</SectionSubtitle>
                        <h2 className="mt-2 text-3xl font-bold md:text-5xl">Latest Articles</h2>
                    </div>
                    <Link href="/articles" className="group flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300">
                        View All News <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col overflow-hidden rounded-xl bg-zinc-900"
                        >
                            <div className="relative aspect-video w-full overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <span className="mb-3 text-xs text-zinc-500">{article.date}</span>
                                <h3 className="mb-3 text-xl font-bold leading-tight group-hover:text-zinc-300 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="flex-1 text-sm text-zinc-400">
                                    {article.excerpt}
                                </p>
                                <Link href={`/articles/${article.id}`} className="mt-6 flex items-center gap-2 text-sm font-medium text-white hover:underline">
                                    Read More <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
