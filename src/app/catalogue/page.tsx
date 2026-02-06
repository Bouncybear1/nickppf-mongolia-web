
import CatalogueView from "@/components/catalogue/CatalogueView";
import CTA from "@/components/sections/CTA";
import { Metadata } from "next";
import { fetchDirectus } from "@/lib/directus";

export const metadata: Metadata = {
    title: "Каталог | NickPPF Mongolia",
    description: "Манай бүтээгдэхүүний дэлгэрэнгүй жагсаалт",
};

export default async function CataloguePage() {
    const catalogueItems = await fetchDirectus("catalogue", {
        filter: JSON.stringify({ status: { _eq: "published" } }),
        sort: "sort",
    });

    return (
        <main>
            <CatalogueView items={catalogueItems} />
            <CTA />
        </main>
    );
}
