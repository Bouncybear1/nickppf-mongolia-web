import { fetchDirectus, about_us_content, Award, Certificate } from "@/lib/directus";
import Hero from "@/components/about/Hero";
import Company from "@/components/about/Company";
import Highlights from "@/components/about/Highlights";
import Awards from "@/components/about/Awards";
import Certificates from "@/components/about/Certificates";
import CTA from "@/components/sections/CTA";

export const revalidate = 60; // Revalidate every minute

export default async function AboutPage() {
    // Fetching from 'about_us_content' collection as per user instruction.
    const aboutDataPromise = fetchDirectus('about_us_content');
    const awardsPromise = fetchDirectus('awards');
    const certificatesPromise = fetchDirectus('certificates');

    const [aboutDataRes, awardsData, certificatesData] = await Promise.all([
        aboutDataPromise,
        awardsPromise,
        certificatesPromise
    ]);

    // If it comes back as an array (common in Directus /items/ endpoint even for singletons unless configured specifically), take first item.
    const aboutData: about_us_content = Array.isArray(aboutDataRes) ? aboutDataRes[0] : aboutDataRes;

    if (!aboutData) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Мэдээлэл олдсонгүй.</p>
            </div>
        );
    }

    return (
        <main className="bg-black min-h-screen">
            <Hero />
            <Company data={aboutData} />
            <Highlights data={aboutData} />
            <Awards data={awardsData as Award[]} />
            <Certificates data={certificatesData as Certificate[]} />
            <CTA />
        </main>
    );
}
