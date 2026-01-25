import Link from "next/link";
import { fetchDirectus, type Article } from "@/lib/directus";
import { Instagram, Facebook } from "lucide-react";

interface Category {
    id: number;
    Title: string;
    slug: string;
}

export default async function Footer() {
    // Fetch categories and latest 3 articles
    let categories: Category[] = [];
    let latestArticles: Article[] = [];

    try {
        const categoriesData = await fetchDirectus('Categories');
        if (Array.isArray(categoriesData)) {
            categories = categoriesData;
        }

        const articlesData = await fetchDirectus('news', {
            limit: '3',
            sort: '-date_created',
            fields: 'id,title,slug'
        });
        if (Array.isArray(articlesData)) {
            latestArticles = articlesData;
        }
    } catch (error) {
        console.error("Failed to load footer data", error);
    }

    return (
        <footer className="bg-[#030404] text-white border-t border-zinc-900">
            {/* Top Section */}
            <div className="mx-auto max-w-[1440px] px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">

                    {/* Product Categories */}
                    {categories.map((category) => (
                        <div key={category.id}>
                            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
                                {category.Title}
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href={`/products/${category.slug}`}
                                        className="text-zinc-400 hover:text-white transition-colors text-sm"
                                    >
                                        Дэлгэрэнгүй үзэх
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ))}

                    {/* Articles and Details */}
                    <div className="md:col-span-2">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
                            Нийтлэл ба холбоо барих
                        </h4>

                        {/* Latest Articles */}
                        <div className="mb-6">
                            <h5 className="text-xs font-semibold text-zinc-500 mb-3 uppercase">Сүүлийн мэдээ</h5>
                            <ul className="space-y-3">
                                {latestArticles.map((article) => (
                                    <li key={article.id}>
                                        <Link
                                            href={`/articles/${article.slug}`}
                                            className="text-zinc-400 hover:text-white transition-colors text-sm line-clamp-1"
                                        >
                                            {article.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm text-zinc-400">
                            <div>
                                <h5 className="text-xs font-semibold text-zinc-500 mb-2 uppercase">Үйлчилгээ</h5>
                                <Link href="/services" className="hover:text-white transition-colors">
                                    Үйлчилгээний мэдээлэл
                                </Link>
                            </div>

                            <div>
                                <h5 className="text-xs font-semibold text-zinc-500 mb-2 uppercase">Хаяг</h5>
                                <address className="not-italic">
                                    Улаанбаатар хот, Монгол Улс
                                </address>
                            </div>

                            <div>
                                <h5 className="text-xs font-semibold text-zinc-500 mb-2 uppercase">Холбогдох</h5>
                                <p>+976 9911-2345</p>
                            </div>

                            <div>
                                <h5 className="text-xs font-semibold text-zinc-500 mb-2 uppercase">Цахим хаяг</h5>
                                <div className="flex items-center gap-4 mt-3">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-80 transition-opacity"
                                        aria-label="Instagram"
                                    >
                                        <Instagram
                                            size={24}
                                            strokeWidth={1.25}
                                            className="text-[#F4D23C]"
                                        />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-80 transition-opacity"
                                        aria-label="Facebook"
                                    >
                                        <Facebook
                                            size={24}
                                            strokeWidth={1.25}
                                            className="text-[#F4D23C]"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-zinc-900">
                <div className="mx-auto max-w-[1440px] px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Left: Official Logo */}
                        <div className="flex items-center gap-4">
                            <img
                                src="/official-authorized-dealer.png"
                                alt="Official Authorized Dealer"
                                className="h-16 w-16"
                            />
                        </div>

                        {/* Right: Terms & Copyright */}
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Үйлчилгээний нөхцөл
                            </Link>
                            <span>•</span>
                            <p>"ЭЙ ЭН ЖЭЙ ТВИНС"-ХХК БҮХ ЭРХ ХУУЛИАР ХАМГААЛАГДСАН</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
