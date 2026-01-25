import Link from "next/link";
import { fetchDirectus, type Article } from "@/lib/directus";
import { Instagram, Facebook } from "lucide-react";

interface Category {
    id: number;
    Title: string;
    slug: string;
}

interface SubCategory {
    id: number;
    title: string;
    slug: string;
    category_id: number;
}

interface Product {
    id: number;
    Title: string;
    slug: string;
    subcategory_id: number;
}

export default async function Footer() {
    // Fetch categories, subcategories, products, and latest 3 articles
    let categories: Category[] = [];
    let subCategories: SubCategory[] = [];
    let products: Product[] = [];
    let latestArticles: Article[] = [];

    try {
        const categoriesData = await fetchDirectus('Categories');
        if (Array.isArray(categoriesData)) {
            categories = categoriesData;
        }
    } catch (error) {
        console.error("Failed to load categories", error);
    }

    try {
        // Fetch Subcategories collection
        const subCategoriesData = await fetchDirectus('Subcategories');
        if (Array.isArray(subCategoriesData)) {
            subCategories = subCategoriesData;
        }
    } catch (error) {
        console.error("Failed to load subcategories", error);
    }

    try {
        // Fetch Products collection
        const productsData = await fetchDirectus('Products', {
            fields: 'id,Title,slug,subcategory_id'
        });
        if (Array.isArray(productsData)) {
            products = productsData;
        }
    } catch (error) {
        console.error("Failed to load products", error);
    }

    try {
        const articlesData = await fetchDirectus('news', {
            limit: '3',
            sort: '-date_created',
            fields: 'id,title,slug'
        });
        if (Array.isArray(articlesData)) {
            latestArticles = articlesData;
        }
    } catch (error) {
        console.error("Failed to load articles", error);
    }

    // Group subcategories by category
    const categoriesWithSubcategories = categories.map(category => ({
        ...category,
        subcategories: subCategories
            .filter(sub => sub.category_id === category.id)
            .map(sub => ({
                ...sub,
                products: products.filter(prod =>
                    prod.subcategory_id === sub.id &&
                    prod.Title !== sub.title // Exclude if product title matches subcategory title
                )
            }))
    }));

    return (
        <footer className="bg-[#030404] text-white">
            {/* Top Section */}
            <div className="mx-auto max-w-[1440px] px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

                    {/* Products Section */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xs font-mono font-medium text-white/72 uppercase tracking-wide mb-8">
                            Бүтээгдэхүүн
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {categoriesWithSubcategories.map((category) => (
                                <div key={category.id}>
                                    {/* Category is not shown, just used for structure */}
                                    <div className="space-y-4">
                                        {category.subcategories.map((subCategory) => (
                                            <div key={subCategory.id}>
                                                <h4 className="mb-3 text-m font-medium text-white/80">
                                                    {subCategory.title}
                                                </h4>
                                                <ul className="space-y-2 mb-4">
                                                    {subCategory.products.map((product) => (
                                                        <li key={product.id}>
                                                            <Link
                                                                href={`/products/${product.slug}`}
                                                                className="text-white/40 hover:text-white transition-colors text-m font-medium"
                                                            >
                                                                {product.Title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Articles and Details Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-mono font-medium text-white/72 uppercase tracking-wide mb-2">
                            Нийтлэл
                        </h3>

                        {/* Latest Articles */}
                        <div className="mb-6">

                            <ul className="space-y-3">
                                {latestArticles.map((article) => (
                                    <li key={article.id}>
                                        <Link
                                            href={`/articles/${article.slug}`}
                                            className="text-white/80 font-medium hover:text-white transition-colors text-sm line-clamp-1"
                                        >
                                            {article.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 text-xs text-white/80">
                            <div>
                                <h3 className="text-xs font-mono font-medium text-white/72 uppercase tracking-wide mb-2">
                                    Үйлчилгээ
                                </h3>
                                <Link href="/services" className="text-white/80 text-s font-medium hover:text-white transition-colors">
                                    Үйлчилгээний мэдээлэл
                                </Link>
                            </div>

                            <div>
                                <h3 className="text-xs font-mono font-medium text-white/72 uppercase tracking-wide mb-2">
                                    Хаяг
                                </h3>
                                <address className="text-white/80 font-medium not-italic">
                                    СХД-н 13-р хороо, Өнөр төв 2 давхар NICKPPFMongolia
                                </address>
                            </div>

                            <div>
                                <h3 className="text-xs font-mono font-medium text-white/72 uppercase tracking-wide mb-2">
                                    Холбогдох
                                </h3>
                                <h5 className="text-white/80 font-medium" >Холбогдох утас:</h5>
                                <p className="text-[#F4D23C] font-medium" >+976 9990 0993</p>
                                <h5 className="text-white/80 font-medium" >Имэйл хаяг:</h5>
                                <p className="text-[#F4D23C] font-medium" >info@nickppfmongolia.mn</p>
                            </div>

                            <div>
                                <h3 className="text-xs font-mono font-medium text-white/72 uppercase tracking-wide mb-2">
                                    Цахим хаяг
                                </h3>
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
            <div className="bg-black">
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
                        <div className="flex items-center gap-4 text-sm text-[#B3B3B3] font-mono font-medium uppercase">
                            <Link href="/terms" className="hover:text-white transition-colors">
                                ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ
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
