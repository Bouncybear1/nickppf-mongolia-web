"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Categories, SubCategories, Product, getDirectusFileUrl } from "@/lib/directus";
import { WordFadeIn } from "@/components/ui/WordFadeIn";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { ChevronDown, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsViewProps {
    categories: Categories[];
    subCategories: SubCategories[];
    products: Product[];
}

export default function ProductsView({
    categories,
    subCategories,
    products,
}: ProductsViewProps) {
    // Default to first category if available
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
        categories.length > 0 ? categories[0].id : null
    );

    const [activeSubCategoryId, setActiveSubCategoryId] = useState<number | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Derive active category object
    const activeCategory = useMemo(
        () => categories.find((c) => c.id === activeCategoryId),
        [categories, activeCategoryId]
    );

    // Filter subcategories based on active category
    const filteredSubCategories = useMemo(
        () => subCategories.filter((sc) => sc.category_id === activeCategoryId),
        [subCategories, activeCategoryId]
    );

    // Reset active subcategory when category changes
    useEffect(() => {
        setActiveSubCategoryId(null);
    }, [activeCategoryId]);

    // Filter products
    const finalProducts = useMemo(() => {
        if (!activeCategoryId) return [];

        let filtered = products;

        // First, filter by category (indirectly via subcategories)
        const categorySubCategoryIds = subCategories
            .filter((sc) => sc.category_id === activeCategoryId)
            .map((sc) => sc.id);

        filtered = filtered.filter(p => {
            const pSubId = Number(p.subcategory_id);
            return categorySubCategoryIds.includes(pSubId);
        });

        // Then filter by specific subcategory if selected
        if (activeSubCategoryId) {
            filtered = filtered.filter((p) => Number(p.subcategory_id) === activeSubCategoryId);
        }

        return filtered;
    }, [products, activeCategoryId, activeSubCategoryId, subCategories]);

    const getProductImage = (product: Product) => {
        if (!product.Featured_image) return "/placeholder.png";
        let imageId: string | number | null = null;
        if (Array.isArray(product.Featured_image)) {
            if (product.Featured_image.length > 0) {
                const first = product.Featured_image[0];
                if (typeof first === 'object' && (first as any).directus_files_id) {
                    imageId = (first as any).directus_files_id;
                } else if (typeof first === 'number' || typeof first === 'string') {
                    imageId = first as any;
                }
            }
        } else {
            imageId = product.Featured_image;
        }
        return imageId ? getDirectusFileUrl(imageId) : "/placeholder.png";
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] flex flex-col justify-end items-start overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                    {activeCategory?.Featured_image && (
                        <Image
                            src={getDirectusFileUrl(activeCategory.Featured_image)}
                            alt="Category Background"
                            fill
                            className="object-cover opacity-60 blur-sm scale-105"
                        />
                    )}
                </div>

                <div className="relative z-20 w-full max-w-[1440px] mx-auto flex flex-col justify-end items-start px-6 pb-20 md:pb-[40px]">
                    <WordFadeIn
                        key={activeCategory?.id || "empty-title"}
                        words={activeCategory?.Title || "Products"}
                        className="text-4xl font-medium tracking-tight md:text-7xl lg:text-8xl text-left text-white capitalize"
                        delay={0}
                    />
                </div>
            </div>

            {/* Categories Section - Separate Section */}
            <div className="max-w-[1600px] mx-auto px-6 mt-10 mb-8 border-b border-white/5 pb-8">
                <SectionSubtitle className="mb-6">Бүтээгдэхүүн</SectionSubtitle>
                <div className="flex flex-wrap gap-3 items-center justify-start">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategoryId(cat.id)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                activeCategoryId === cat.id
                                    ? "bg-zinc-800/30 text-white text-md font-book border-[#F4D23C]"
                                    : "bg-zinc-800/30 text-zinc-300 border-white/5 text-md font-book hover:bg-zinc-700/50 hover:text-white"
                            )}
                        >
                            {cat.Title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6">
                {/* Filter Controller Row */}
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-[#F4D23C] transition-colors"
                    >
                        <ChevronDown className={cn("w-8 h-4 transition-transform duration-300", isFilterOpen ? "rotate-180" : "rotate-0")} />
                        <span className="font-mono uppercase">Шүүлтүүр</span>
                        {activeSubCategoryId && <span className="text-[#F4D23C] text-xs ml-1">(Active)</span>}
                    </button>
                    <div className="text-zinc-500 text-sm">
                        <span className="font-mono uppercase">Нийт илэрц ({finalProducts.length}) </span>
                    </div>
                </div>

                <div className={cn(
                    "grid gap-8 transition-all duration-500 ease-in-out",
                    isFilterOpen ? "grid-cols-1 lg:grid-cols-5" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                )}>
                    {/* Sidebar Filter - Column 1 (Only visible if open) */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -20, width: 0 }}
                                animate={{ opacity: 1, x: 0, width: "auto" }}
                                exit={{ opacity: 0, x: -20, width: 0 }}
                                className="lg:col-span-1 border-r border-white/5 pr-6 hidden lg:block overflow-hidden"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Subcategories</h3>
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => setActiveSubCategoryId(null)}
                                                className={cn(
                                                    "block w-full text-left text-sm transition-colors",
                                                    activeSubCategoryId === null
                                                        ? ""
                                                        : "text-zinc-400 hover:text-white font-mono uppercase tracking-wide"
                                                )}
                                            >
                                                {activeSubCategoryId === null ? (
                                                    <SectionSubtitle className="mb-0">View All</SectionSubtitle>
                                                ) : (
                                                    "View All"
                                                )}
                                            </button>
                                            {filteredSubCategories.map((sub) => (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => setActiveSubCategoryId(sub.id)}
                                                    className={cn(
                                                        "block w-full text-left text-sm transition-colors",
                                                        activeSubCategoryId === sub.id
                                                            ? ""
                                                            : "text-zinc-400 hover:text-white font-mono uppercase tracking-wide"
                                                    )}
                                                >
                                                    {activeSubCategoryId === sub.id ? (
                                                        <SectionSubtitle className="mb-0">{sub.title}</SectionSubtitle>
                                                    ) : (
                                                        sub.title
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Filter Drawer */}
                    {isFilterOpen && (
                        <div className="lg:hidden mb-6 bg-zinc-900 p-4 rounded-lg">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Subcategories</h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setActiveSubCategoryId(null)}
                                    className={cn("px-3 py-1 text-sm border rounded-full", activeSubCategoryId === null ? 'border-[#F4D23C] text-[#F4D23C]' : 'border-zinc-700 text-zinc-400')}
                                >
                                    All
                                </button>
                                {filteredSubCategories.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setActiveSubCategoryId(sub.id)}
                                        className={cn("px-3 py-1 text-sm border rounded-full", activeSubCategoryId === sub.id ? 'border-[#F4D23C] text-[#F4D23C]' : 'border-zinc-700 text-zinc-400')}
                                    >
                                        {sub.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Products Grid */}
                    <div className={cn(
                        "transition-all duration-300",
                        isFilterOpen ? "lg:col-span-4" : "lg:col-span-4"
                    )}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
                                {finalProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group flex flex-col gap-3 relative"
                                    >
                                        <div className="aspect-[4/4] w-full relative overflow-hidden bg-zinc-900 rounded-lg group">
                                            <Image
                                                src={getProductImage(product)}
                                                alt={product.Title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <Button
                                                    variant="yellow"
                                                    className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 rounded-[400px]"
                                                >
                                                    Дэлгэрэнгүй
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-white transition-colors line-clamp-1">
                                                {product.Title}
                                            </h3>
                                            <p className="text-zinc-500 font-book text-md line-clamp-2 mt-1 tracking-[0.02em] leading-[1.5rem]">
                                                {product.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {finalProducts.length === 0 && (
                            <div className="text-center py-20 text-zinc-500 col-span-full">
                                <p>No products found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
