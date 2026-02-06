import CatalogueView from "@/components/catalogue/CatalogueView";
import CTA from "@/components/sections/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Каталог | NickPPF Mongolia",
    description: "Манай бүтээгдэхүүний дэлгэрэнгүй жагсаалт",
};

export default function CataloguePage() {
    return (
        <main>
            <CatalogueView />
            <CTA />
        </main>
    );
}
