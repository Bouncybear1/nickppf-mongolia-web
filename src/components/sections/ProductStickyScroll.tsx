"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";

// Mock Data
const products = [
    {
        id: 1,
        title: "Paint Protection Film",
        description: "Invisible shield against stone chips, scratches, and road debris. Self-healing technology ensures your car looks new forever.",
        image: "https://images.unsplash.com/photo-1621257008182-f72565612ac5?q=80&w=2070&auto=format&fit=crop",
        label: "PAINT PROTECTION FILM"
    },
    {
        id: 2,
        title: "Window Tint Film",
        description: "Superior heat rejection and UV protection. Enhance privacy and comfort while protecting your interior from fading.",
        image: "https://images.unsplash.com/photo-1689255755523-b1d6240dca44?q=80&w=1931&auto=format&fit=crop",
        label: "CAR WINDOW FILM"
    },
    {
        id: 3,
        title: "Car Wrap",
        description: "Transform your vehicle's appearance with premium color change wraps. Hundreds of colors and finishes available.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
        label: "CAR WRAP"
    },
    {
        id: 4,
        title: "New Products",
        description: "Explore our latest innovations in automotive protection and aesthetic enhancement.",
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
        label: "NEW PRODUCT"
    }
];

export default function ProductStickyScroll() {
    const [activeId, setActiveId] = useState(1);

    return (
        <section className="relative w-full bg-[#0F0F0F] text-white pb-24 border-y border-[#2A2A2A]">
            <div className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-start">

                {/* Scrollable Left Column (Images) */}
                <div className="w-full lg:w-1/2 px-4 py-12 lg:py-24 space-y-24 lg:space-y-48">
                    {products.map((product) => (
                        <ProductImage key={product.id} product={product} setActiveId={setActiveId} />
                    ))}
                    <div className="h-24 lg:hidden" /> {/* Spacer for mobile */}
                </div>

                {/* Sticky Right Column (Content & ToC) */}
                <div className="hidden lg:flex w-1/2 flex-col justify-center p-16 sticky top-0 h-screen self-start">

                    {/* Header */}
                    <div className="mb-12">
                        <SectionSubtitle>
                            Products & Services
                        </SectionSubtitle>
                        <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                            Premium Protection
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-md">
                            Explore our comprehensive range of high-quality automotive protection films and services designed to maintain your vehicle's showroom condition.
                        </p>
                    </div>

                    {/* Table of Contents */}
                    <div className="flex flex-col gap-4 border-t border-white/10 pt-8 w-full max-w-md">
                        {products.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => {
                                    document.getElementById(`product-${product.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                                className={cn(
                                    "group flex items-center justify-between py-2 text-left text-sm uppercase tracking-wider transition-all",
                                    activeId === product.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                )}
                            >
                                <span className="flex items-center gap-3 font-mono">
                                    {/* Yellow Box Indicator */}
                                    {activeId === product.id && (
                                        <motion.span
                                            layoutId="activeBox"
                                            className="h-2 w-2 bg-[#F6BE00] block"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                    {product.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Button className="mt-12 w-fit text-sm font-bold" variant="yellow">
                        Get Consultation
                    </Button>
                </div>
            </div>

            {/* Mobile Fixed Content (Simpler version) */}
            <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-white/10 p-4 lg:hidden z-40">
                <p className="text-[#F6BE00] text-xs font-bold uppercase mb-1">
                    {products.find(p => p.id === activeId)?.label}
                </p>
                <p className="text-sm font-medium text-white line-clamp-1">
                    {products.find(p => p.id === activeId)?.title}
                </p>
            </div>
        </section>
    );
}

function ProductImage({ product, setActiveId }: { product: any, setActiveId: (id: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveId(product.id);
        }
    }, [isInView, product.id, setActiveId]);

    return (
        <div id={`product-${product.id}`} ref={ref} className="group relative w-full aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-zinc-800 scroll-mt-32">
            <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Mobile Overlay Text */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-2xl font-bold">{product.title}</h3>
                <p className="text-sm text-zinc-300 mt-2">{product.description}</p>
            </div>
        </div>
    );
}
