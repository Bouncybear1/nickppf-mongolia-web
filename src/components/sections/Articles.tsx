"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { Button } from "@/components/ui/Button";
import { fetchDirectus, getDirectusFileUrl, fetchDirectusCount, type Article } from "@/lib/directus";

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                // Fetch latest 3 articles
                const data = await fetchDirectus('news', {
                    limit: '3',
                    sort: '-date_created'
                });

                // Fetch total count
                const count = await fetchDirectusCount('news');
                setTotalCount(count);

                if (Array.isArray(data)) {
                    setArticles(data);
                }
            } catch (error) {
                console.error("Failed to load articles", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    // Mongolian date formatter
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getFullYear()} оны ${date.getMonth() + 1} сарын ${date.getDate()}`;
    };

    return (
        <section className="bg-zinc-950 py-24 text-white">
            <div className="mx-auto max-w-[1440px] px-6">
                <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <SectionSubtitle>Нийтлэл</SectionSubtitle>
                        <h2 className="mt-2 text-3xl font-medium md:text-5xl">Мэдээ, мэдээлэл</h2>
                    </div>
                    <Button href="/articles" variant="black" className="px-6 py-2 text-[1.2rem]">
                        Бүх нийтлэл унших ({totalCount})
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {loading ? (
                        // Simple loading skeleton or text
                        <div className="col-span-3 text-center text-zinc-500 py-12">
                            Мэдээг татаж байна...
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="col-span-3 text-center text-zinc-500 py-12">
                            Мэдээ байхгүй байна.
                        </div>
                    ) : (
                        articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col overflow-hidden rounded-[8px] bg-[#121212] p-[8px]"
                            >
                                <div className="relative h-[270px] overflow-hidden">
                                    {/* Safety check for image */}
                                    {article.Featured_image ? (
                                        <img
                                            src={getDirectusFileUrl(article.Featured_image)}
                                            alt={article.title}
                                            className="h-[270px] g-[10px] rounded-[8px] w-full object-cover transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-[#121212] flex items-center justify-center text-zinc-600">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <SectionSubtitle>{formatDate(article.date_created)}</SectionSubtitle>
                                    <h3 className="mb-3 font-medium leading-tight group-hover:text-zinc-300 transition-colors text-[1.6rem] line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <div className="mt-6">
                                        <Button href={`/articles/${article.slug}`} variant="black" className="w-fit text-[1.2rem]">
                                            Цааш унших
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
