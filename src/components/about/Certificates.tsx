"use client";

import { Certificate } from "@/lib/directus";
import Carousel from "@/components/ui/Carousel";
import { SectionSubtitle } from "../ui/SectionSubtitle";

interface CertificatesProps {
    data: Certificate[];
}

export default function Certificates({ data }: CertificatesProps) {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <section className="bg-black py-24 text-white border-t border-white/5 relative overflow-hidden">
            <div className="mx-auto max-w-[1440px] px-6">
                <div className="mb-16 text-left">
                    <SectionSubtitle>Чанарын баталгаа</SectionSubtitle>
                    <h2 className="text-3xl font-bold md:text-4xl text-white">Сертификат</h2>
                </div>

                <Carousel items={data} placeholderIcon="certificate" />
            </div>
        </section>
    );
}
