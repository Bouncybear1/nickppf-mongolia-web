import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { Button } from "@/components/ui/Button";
import { fetchDirectus, fetchDirectusCount, type Article } from "@/lib/directus";
import { ArticleCard } from "./ArticleCard";

export default async function Articles() {
    // Fetch data on the server
    let articles: Article[] = [];
    let totalCount = 0;

    try {
        // Fetch latest 3 articles
        const data = await fetchDirectus('news', {
            limit: '3',
            sort: '-date_created'
        });

        // Fetch total count
        totalCount = await fetchDirectusCount('news');

        if (Array.isArray(data)) {
            articles = data;
        }
    } catch (error) {
        console.error("Failed to load articles", error);
    }

    return (
        <section className="bg-[#030404] py-24 text-white">
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
                    {articles.length === 0 ? (
                        <div className="col-span-3 text-center text-zinc-500 py-12">
                            Мэдээ байхгүй байна.
                        </div>
                    ) : (
                        articles.map((article, index) => (
                            <ArticleCard key={article.id} article={article} index={index} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
