import { notFound } from "next/navigation";
import { fetchDirectus, getDirectusFileUrl, type Article } from "@/lib/directus";
import { Calendar, User } from "lucide-react";
import { Metadata } from "next";

interface ArticlePageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params; // Await params in Next.js 16

    try {
        const article = await fetchDirectus('news', {
            'filter[slug][_eq]': slug,
            'limit': '1'
        }) as Article[];

        if (!article || article.length === 0) {
            return {
                title: 'Article Not Found'
            };
        }

        const articleData = article[0];

        return {
            title: articleData.title,
            description: articleData.excerpt || articleData.title,
            openGraph: {
                title: articleData.title,
                description: articleData.excerpt || articleData.title,
                type: 'article',
                publishedTime: articleData.date_created,
                images: articleData.Featured_image
                    ? [getDirectusFileUrl(articleData.Featured_image)]
                    : [],
            },
        };
    } catch (error) {
        return {
            title: 'Article Not Found'
        };
    }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params; // Await params in Next.js 16
    let article: Article | null = null;

    try {
        const data = await fetchDirectus('news', {
            'filter[slug][_eq]': slug,
            'limit': '1'
        }) as Article[];

        if (data && Array.isArray(data) && data.length > 0) {
            article = data[0];
        }
    } catch (error) {
        console.error("Failed to fetch article:", error);
    }

    if (!article) {
        notFound();
    }

    const publishDate = new Date(article.date_created);

    return (
        <div className="bg-zinc-950 text-white min-h-screen">
            {/* Article Header */}
            <header className="pt-32 pb-12 px-6">
                <div className="mx-auto max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm text-zinc-500">
                        <a href="/articles" className="hover:text-white transition-colors">
                            Мэдээ, мэдээлэл
                        </a>
                        <span className="mx-2">/</span>
                        <span className="text-white">{article.title}</span>
                    </nav>

                    {/* Title */}
                    <h1 className="text-4xl font-medium tracking-tight md:text-6xl lg:text-7xl mb-6">
                        {article.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <time dateTime={article.date_created}>
                                {publishDate.toLocaleDateString('mn-MN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {article.Featured_image && (
                <div className="px-6 mb-12">
                    <div className="mx-auto max-w-5xl">
                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-900">
                            <img
                                src={getDirectusFileUrl(article.Featured_image)}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Article Content */}
            <article className="px-6 pb-24">
                <div className="mx-auto max-w-2xl">
                    {/* Excerpt/Lead */}
                    {article.excerpt && (
                        <p className="text-xl text-zinc-300 mb-12 leading-relaxed">
                            {article.excerpt}
                        </p>
                    )}

                    {/* Main Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:font-medium prose-headings:tracking-tight
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                            prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-[#F4D23C] prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-white prose-strong:font-medium
                            prose-img:rounded-lg prose-img:my-8
                            prose-ul:text-zinc-300 prose-ul:my-6
                            prose-ol:text-zinc-300 prose-ol:my-6
                            prose-li:my-2
                            prose-blockquote:border-l-[#F4D23C] prose-blockquote:text-zinc-400
                            prose-code:text-[#F4D23C] prose-code:bg-zinc-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            </article>

            {/* Back to Articles Link */}
            <div className="px-6 pb-24">
                <div className="mx-auto max-w-2xl">
                    <a
                        href="/articles"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Бүх нийтлэл рүү буцах
                    </a>
                </div>
            </div>
        </div>
    );
}
