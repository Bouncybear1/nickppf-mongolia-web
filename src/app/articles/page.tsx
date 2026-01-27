"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { fetchDirectus, getDirectusFileUrl, type Article, type Featured_news } from "@/lib/directus";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Note: Metadata should be in a separate layout.tsx or moved to Server Component wrapper
// For now, this is a client component due to interactive ToC

// Mongolian month names
const MONGOLIAN_MONTHS = [
    "1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар",
    "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
];

interface GroupedArticles {
    month: number;
    year: number;
    articles: Article[];
}

export default function ArticlesPage() {
    const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
    const [recentPosts, setRecentPosts] = useState<Article[]>([]);
    const [groupedArticles, setGroupedArticles] = useState<GroupedArticles[]>([]);
    const [activeSection, setActiveSection] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadArticles() {
            try {
                // Fetch featured article
                const featuredNewsData = await fetchDirectus('Featured_news', {
                    limit: '1'
                }) as Featured_news[] | Featured_news;

                let featuredId: number | null = null;
                if (Array.isArray(featuredNewsData) && featuredNewsData.length > 0) {
                    featuredId = featuredNewsData[0].News_to_feature;
                } else if (featuredNewsData && 'News_to_feature' in featuredNewsData) {
                    featuredId = featuredNewsData.News_to_feature;
                }

                if (featuredId) {
                    const featured = await fetchDirectus(`news/${featuredId}`);
                    if (featured && !Array.isArray(featured)) {
                        setFeaturedArticle(featured as Article);
                    }
                }

                // Fetch all articles
                const allArticles = await fetchDirectus('news', {
                    sort: '-date_created'
                }) as Article[];

                if (Array.isArray(allArticles)) {
                    // Get recent 8 posts (excluding featured)
                    const recent = allArticles
                        .filter(art => art.id !== featuredId)
                        .slice(0, 8);
                    setRecentPosts(recent);

                    // Group remaining articles by month and year
                    const remaining = allArticles.filter(art => art.id !== featuredId).slice(8);
                    const grouped = groupArticlesByMonth(remaining);
                    setGroupedArticles(grouped);
                }
            } catch (error) {
                console.error("Failed to load articles", error);
            } finally {
                setLoading(false);
            }
        }
        loadArticles();
    }, []);

    function groupArticlesByMonth(articles: Article[]): GroupedArticles[] {
        const groups: { [key: string]: GroupedArticles } = {};

        articles.forEach(article => {
            const date = new Date(article.date_created);
            const month = date.getMonth();
            const year = date.getFullYear();
            const key = `${year}-${month}`;

            if (!groups[key]) {
                groups[key] = { month, year, articles: [] };
            }
            groups[key].articles.push(article);
        });

        return Object.values(groups).sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
        });
    }

    if (loading) {
        return <div className="min-h-screen bg-zinc-950" />;
    }

    return (
        <div className="bg-zinc-950 text-white min-h-screen">
            {/* Hero Header */}
            <section className="pt-32 pb-16 px-6">
                <div className="mx-auto max-w-[1440px]">
                    <h1 className="text-4xl font-medium tracking-tight md:text-7xl lg:text-8xl">
                        Мэдээ, мэдээлэл
                    </h1>
                    <p className="mt-4 text-lg text-zinc-400 max-w-[65ch]">
                        NICK PPF Mongolia-ийн сүүлийн үеийн мэдээ, шинэ бүтээгдэхүүн болон үйлчилгээний талаарх мэдээллүүд
                    </p>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && (
                <section className="px-6 pb-24">
                    <div className="mx-auto max-w-[1440px]">
                        <FeaturedArticleCard article={featuredArticle} />
                    </div>
                </section>
            )}

            {/* Recent Posts Grid */}
            {recentPosts.length > 0 && (
                <section className="px-6 pb-24">
                    <div className="mx-auto max-w-[1440px]">
                        <h2 className="text-3xl font-medium md:text-5xl mb-12">Сүүлийн нийтлэлүүд</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recentPosts.map((article, idx) => (
                                <ArticleCard key={article.id} article={article} index={idx} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Monthly Archive with ToC */}
            {groupedArticles.length > 0 && (
                <section className="px-6 pb-24">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="flex gap-12">
                            {/* ToC Sidebar */}
                            <aside className="hidden lg:block w-64 sticky top-24 self-start">
                                <h3 className="text-sm font-mono font-medium text-white/72 uppercase tracking-wide mb-6">
                                    Архив
                                </h3>
                                <nav className="space-y-2">
                                    {groupedArticles.map(group => {
                                        const sectionId = `${group.year}-${group.month}`;
                                        return (
                                            <button
                                                key={sectionId}
                                                onClick={() => {
                                                    document.getElementById(sectionId)?.scrollIntoView({
                                                        behavior: 'smooth',
                                                        block: 'start'
                                                    });
                                                }}
                                                className={cn(
                                                    "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                                    activeSection === sectionId
                                                        ? "bg-[#F4D23C] text-black font-medium"
                                                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                                                )}
                                            >
                                                {MONGOLIAN_MONTHS[group.month]}, {group.year}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </aside>

                            {/* Articles by Month */}
                            <div className="flex-1 space-y-24">
                                {groupedArticles.map(group => (
                                    <MonthSection
                                        key={`${group.year}-${group.month}`}
                                        group={group}
                                        setActiveSection={setActiveSection}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

function FeaturedArticleCard({ article }: { article: Article }) {
    return (
        <Link href={`/articles/${article.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900 h-[500px] md:h-[600px]"
            >
                {article.Featured_image && (
                    <img
                        src={getDirectusFileUrl(article.Featured_image)}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="flex items-center gap-2 text-[#F4D23C] text-sm mb-4">
                        <Calendar size={16} />
                        <time>{new Date(article.date_created).toLocaleDateString('mn-MN')}</time>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 max-w-[20ch]">
                        {article.title}
                    </h2>
                    {article.excerpt && (
                        <p className="text-lg text-zinc-300 max-w-[65ch] line-clamp-2">
                            {article.excerpt}
                        </p>
                    )}
                    <div className="mt-6 inline-flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                        <span>Унших</span>
                        <ArrowRight size={20} />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
    return (
        <Link href={`/articles/${article.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
            >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-zinc-900">
                    {article.Featured_image && (
                        <img
                            src={getDirectusFileUrl(article.Featured_image)}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    )}
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
                    <Calendar size={14} />
                    <time>{new Date(article.date_created).toLocaleDateString('mn-MN')}</time>
                </div>
                <h3 className="text-lg font-medium mb-2 group-hover:text-zinc-300 transition-colors line-clamp-2">
                    {article.title}
                </h3>
                {article.excerpt && (
                    <p className="text-sm text-zinc-400 line-clamp-2 max-w-[65ch]">
                        {article.excerpt}
                    </p>
                )}
            </motion.div>
        </Link>
    );
}

function MonthSection({ group, setActiveSection }: { group: GroupedArticles; setActiveSection: (id: string) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
    const sectionId = `${group.year}-${group.month}`;

    useEffect(() => {
        if (isInView) {
            setActiveSection(sectionId);
        }
    }, [isInView, sectionId, setActiveSection]);

    return (
        <div id={sectionId} ref={ref} className="scroll-mt-24">
            <h2 className="text-3xl font-medium md:text-5xl mb-8 flex items-center gap-4">
                <span>{MONGOLIAN_MONTHS[group.month]}</span>
                <span className="text-zinc-600">{group.year}</span>
            </h2>
            <div className="space-y-6">
                {group.articles.map(article => (
                    <Link key={article.id} href={`/articles/${article.slug}`}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group flex gap-6 pb-6 border-b border-zinc-900 hover:border-zinc-800 transition-colors"
                        >
                            <div className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden bg-zinc-900">
                                {article.Featured_image && (
                                    <img
                                        src={getDirectusFileUrl(article.Featured_image)}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
                                    <Calendar size={14} />
                                    <time>{new Date(article.date_created).toLocaleDateString('mn-MN')}</time>
                                </div>
                                <h3 className="text-xl font-medium mb-2 group-hover:text-zinc-300 transition-colors">
                                    {article.title}
                                </h3>
                                {article.excerpt && (
                                    <p className="text-zinc-400 line-clamp-2 max-w-[65ch]">
                                        {article.excerpt}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
