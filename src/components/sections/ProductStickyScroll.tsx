import { fetchDirectus } from "@/lib/directus";
import { ProductStickyScrollClient } from "./ProductStickyScrollClient";

export default async function ProductStickyScroll() {
    let items: any[] = [];

    try {
        // Fetch Categories
        const categories = await fetchDirectus('Categories');

        // Fetch Featured Product ID (Singleton)
        const featuredConfig = await fetchDirectus('Featured_product', {
            fields: 'featured_product'
        });

        let formattedItems: any[] = [];

        if (Array.isArray(categories)) {
            formattedItems = categories.map((cat: any) => ({
                id: `cat-${cat.id}`,
                title: cat.Title,
                description: cat.short_description,
                image: Array.isArray(cat.Featured_image) ? cat.Featured_image[0] : cat.Featured_image,
                label: cat.Title ? cat.Title.toUpperCase() : "CATEGORY"
            }));
        }

        // Handle Featured Product Fetch
        let featuredProductId: number | null = null;

        // Check if singleton (object) or array (just in case)
        if (featuredConfig) {
            if (Array.isArray(featuredConfig) && featuredConfig.length > 0) {
                featuredProductId = featuredConfig[0].featured_product;
            } else if (typeof featuredConfig === 'object' && 'featured_product' in featuredConfig) {
                featuredProductId = (featuredConfig as any).featured_product;
            }
        }

        if (featuredProductId) {
            try {
                // Fetch the actual product details using the ID
                const productData = await fetchDirectus(`Products/${featuredProductId}`, {
                    fields: '*,Featured_image.directus_files_id'
                });

                if (productData && productData.id) {
                    // Handle M2M Image Relation
                    let imageId = productData.Featured_image;

                    if (Array.isArray(productData.Featured_image) && productData.Featured_image.length > 0) {
                        const firstImg = productData.Featured_image[0];
                        if (typeof firstImg === 'object' && firstImg.directus_files_id) {
                            imageId = firstImg.directus_files_id;
                        } else {
                            imageId = firstImg;
                        }
                    }

                    const featuredItem = {
                        id: `prod-${productData.id}`,
                        title: productData.Title,
                        description: productData.description,
                        image: imageId,
                        label: "FEATURED PRODUCT"
                    };
                    formattedItems = [...formattedItems, featuredItem];
                }
            } catch (e) {
                console.error("Failed to fetch featured product details", e);
            }
        }

        items = formattedItems;
    } catch (err) {
        console.error("Failed to load sticky scroll items", err);
    }

    return <ProductStickyScrollClient items={items} />;
}
