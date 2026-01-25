"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { WordFadeIn } from "../ui/WordFadeIn";
import { getDirectusFileUrl } from "@/lib/directus";

interface ProductItem {
    id: string;
    title: string;
    description: string;
    image: string;
    label: string;
}

interface ProductStickyScrollClientProps {
    items: ProductItem[];
}

export function ProductStickyScrollClient({ items }: ProductStickyScrollClientProps) {
    const [activeId, setActiveId] = useState<number | string>(items[0]?.id || 1);

    if (items.length === 0) {
        return <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-white">No products available</div>;
    }

    return (
        <section className="relative w-[100vw] bg-[#0F0F0F] text-white pb-24 border-y border-[#2A2A2A]">
            <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row lg:items-start">

                {/* Scrollable Left Column (Images) */}
                <div className="w-full lg:w-1/2 px-4 py-24 lg:py-24 space-y-12">
                    {items.map((product) => (
                        <ProductImage key={product.id} product={product} setActiveId={setActiveId} />
                    ))}
                    <div className="h-24 lg:hidden" /> {/* Spacer for mobile */}
                </div>

                {/* Sticky Right Column (Content & ToC) */}
                <div className="hidden lg:flex w-1/2 flex-col justify-center p-16 sticky top-0 h-screen self-start">

                    {/* Header */}
                    <div className="mb-12">
                        <SectionSubtitle>
                            БҮТЭЭГДЭХҮҮН,ҮЙЛЧИЛГЭЭ
                        </SectionSubtitle>
                        <WordFadeIn
                            words="NICK-ийн бүтээгдэхүүнүүд"
                            className="mb-6 text-4xl font-medium leading-tight md:text-5xl text-white"
                            delay={0.1}
                        />
                        <WordFadeIn
                            words="Бодит хэрэглээнд тулгуурлан тасралтгүй шинэчилж, хөгжүүлсээр ирсэн. Бүтээгдэхүүн бүрийг 10 гаруй жилийн турш гадаа орчинд туршсан. Хийсэн шинэчлэл бүр танд өгч буй бидний амлалт юм."
                            className="text-lg text-zinc-400 max-w-md"
                            delay={0.05}
                        />
                    </div>

                    {/* Table of Contents */}
                    <div className="flex flex-col w-full max-w-md divide-y divide-[#B3B3B3]/20">
                        {items.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => {
                                    document.getElementById(`product-${product.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                                className={cn(
                                    "group flex items-center justify-between py-4 text-left text-sm uppercase tracking-wider transition-all",
                                    activeId === product.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                )}
                            >
                                <span className="flex items-center gap-3 font-mono font-si">
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
                    <div className="mt-8 w-full">
                        <Button
                            href="/contact"
                            className="w-fit font-medium" variant="yellow">
                            Үйлчилгээ авах
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Content (Simpler version) */}
            <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-white/10 p-4 lg:hidden z-40">
                <p className="text-[#F6BE00] text-xs font-bold uppercase mb-1">
                    {items.find(p => p.id === activeId)?.label}
                </p>
                <p className="text-sm font-medium text-white line-clamp-1">
                    {items.find(p => p.id === activeId)?.title}
                </p>
            </div>
        </section>
    );
}

function ProductImage({ product, setActiveId }: { product: ProductItem, setActiveId: (id: number | string) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveId(product.id);
        }
    }, [isInView, product.id, setActiveId]);

    return (
        <div id={`product-${product.id}`} ref={ref} className="group lg:relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-800 scroll-mt-32">
            {product.image ? (
                <img
                    src={getDirectusFileUrl(product.image)}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className="h-full w-full flex items-center justify-center text-zinc-600 bg-zinc-800">No Image</div>
            )}

            <div className="absolute inset-0 bg-black/20" />

            {/* Mobile Overlay Text */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                {/* Decorative Box (Rotated) */}
                <div className={cn(
                    "absolute left-[-30px] top-[calc(24px-35px)] w-[64px] h-[110px] rounded-full transition-opacity duration-500 bg-[radial-gradient(50%_50%_at_50%_50%,#F4D23C_0%,rgba(244,210,60,0)_100%)] blur-[12px] pointer-events-none",
                    isInView ? "opacity-100" : "opacity-0"
                )} />
                <div className={cn(
                    "absolute top-6 left-0 w-[4px] h-[40px] rounded-tr-[3px] rounded-br-[3px] transition-colors duration-500",
                    isInView ? "bg-[#F4D23C]" : "bg-[#2A2A2A]"
                )} />

                <h3 className="text-[1.6rem] font-medium text-white ml-4">{product.title}</h3>
                <p className="text-[16px] font-normal text-white/80 mt-2 ml-4">{product.description}</p>
            </div>
        </div>
    );
}
