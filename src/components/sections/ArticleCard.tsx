"use client";

import { motion } from "framer-motion";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { Button } from "@/components/ui/Button";
import { getDirectusFileUrl, type Article } from "@/lib/directus";

interface ArticleCardProps {
    article: Article;
    index: number;
}

// Mongolian date formatter
function formatDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()} оны ${date.getMonth() + 1} сарын ${date.getDate()}`;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
    return (
        <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col overflow-hidden rounded-[8px] bg-[#121212] p-[8px]"
        >
            <div className="relative h-[270px] overflow-hidden">
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
    );
}
