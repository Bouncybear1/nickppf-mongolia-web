import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { fetchDirectus } from "@/lib/directus";

export default async function ContactPage() {
    let categories = [];
    try {
        categories = await fetchDirectus('Categories');
    } catch (error) {
        console.error("Failed to fetch categories for contact form", error);
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-zinc-950">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Form */}
                    <div className="w-full">
                        <ContactForm categories={categories} />
                    </div>

                    {/* Right Column: Contact Info & Map */}
                    <div className="w-full h-full">
                        <ContactInfo />
                    </div>

                </div>
            </div>
        </div>
    );
}
