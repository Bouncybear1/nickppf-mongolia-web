import { fetchDirectus } from "@/lib/directus";
import ProductsView from "@/components/products/ProductsView";
import CTA from "@/components/sections/CTA";

export const metadata = {
    title: "Products | NickPPF Mongolia",
    description: "Browse our premium automotive protection films and products.",
};

export default async function ProductsPage() {
    // Fetch all required data in parallel with error handling
    const [categories, subCategories, products] = await Promise.all([
        fetchDirectus("Categories").catch(err => {
            console.error("Failed to fetch Categories:", err);
            return [];
        }),
        fetchDirectus("Subcategories").catch(err => {
            console.error("Failed to fetch Subcategories:", err);
            return [];
        }),
        // Fetch products with expanded image data
        fetchDirectus("Products", {
            fields: "*,Featured_image.directus_files_id",
            limit: "-1", // Fetch all
        }).catch(err => {
            console.error("Failed to fetch Products:", err);
            return [];
        }),
    ]);

    return (
        <>
            <ProductsView
                categories={categories}
                subCategories={subCategories}
                products={products}
            />
            <CTA />
        </>
    );
}
