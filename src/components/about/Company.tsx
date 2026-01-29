"use client";

import { motion } from "framer-motion";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { about_us_content, getDirectusFileUrl } from "@/lib/directus";
import FeatureCard from "@/components/ui/FeatureCard";
import { Target, Gem, Handshake } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface CompanyProps {
    data: about_us_content;
}

export default function Company({ data }: CompanyProps) {
    const imageUrl = getDirectusFileUrl(data.company_image);

    return (
        <section className="bg-black py-24 text-white">
            <div className="mx-auto max-w-[1440px] px-6">

                {/* Header Section: 3 Columns (Title, Image, Description) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-start">

                    {/* Column 1: Title & Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        <SectionSubtitle>Бидний тухай</SectionSubtitle>
                        <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                            NICK бол зүгээр нэг брэнд биш
                        </h2>
                    </motion.div>

                    {/* Column 2: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative h-full min-h-[300px] overflow-hidden rounded-[8px] border border-white/10"
                    >
                        <img
                            src={imageUrl}
                            alt="NickPPF Company"
                            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>

                    {/* Column 3: Description */}
                    <div className="group relative overflow-hidden flex flex-col items-start p-6 rounded-[8px] bg-[#0F0F0F] border border-black transition-colors shadow-[inset_0_2px_2px_rgba(255,255,255,0.08)]">
                        {/* Decorative Box */}
                        <div className="absolute top-[-30px] left-[-11px] w-[110px] h-[64px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(50%_50%_at_50%_50%,#F4D23C_0%,rgba(244,210,60,0)_100%)] blur-[12px] pointer-events-none" />
                        <div className="absolute top-0 left-6 w-[40px] h-[4px] bg-[#2A2A2A] rounded-bl-[3px] rounded-br-[3px] transition-colors duration-500 group-hover:bg-[#F4D23C]" />

                        <div className="text-white/60">
                            <p className="text-[1rem] leading-[1.4rem] mb-4 tracking-[0.04rem] font-book">
                                Энэ бол Хятадын үйлдвэрлэлийн чанар, ур чадварын олон жилийн баталгаа юм. Бид дээд зэрэглэлийн гурван төрлийн плёнк бүтээгдэхүүн нийлүүлдэг
                            </p>
                            <div className="font-mono text-[0.875rem] font-medium mb-4 flex flex-col gap-5">
                                <p className="pl-5 border-b border-white/60">Автомашины хамгаалалтын плёнк (PPF)</p>
                                <p className="pl-5 border-b border-white/60">Өнгө өөрчлөх плёнк</p>
                                <p className="pl-5 border-b border-white/60">Автомашины шилний плёнк</p>
                            </div>
                            <p className="text-[1rem] leading-[1.4rem] tracking-[0.04rem] font-book">
                                Бид дэлхийн шилдэг түүхий эдийг ашиглаж, эх үүсвэрээс эхлээд эцсийн бүтээгдэхүүн хүртэл чанарын хатуу хяналтыг мөрдөн, өндөр гүйцэтгэлтэй бүтээгдэхүүн хүргэхийг зорьдог.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: 3-Column Grid (Mission, Values, Image) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* Column 1: Mission Statement */}
                    <FeatureCard
                        title="Эрхэм зорилго"
                        description={data.mission_statement}
                        icon={Handshake}
                        delay={0}
                        className="h-full"
                    />

                    {/* Column 2: Values */}
                    <FeatureCard
                        title="Үнэт зүйлс"
                        description={data.value}
                        icon={Gem}
                        delay={0.1}
                        className="h-full"
                    />

                    {/* Column 3: Image (Reuse for visual balance as per request for 3rd col) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative h-full w-full overflow-hidden rounded-[8px] border border-white/10 group bg-[#0F0F0F] hidden"
                    >
                        <img
                            src={imageUrl}
                            alt="NickPPF Company"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 hidden"
                        />
                        <div className="absolute inset-0 bg-black/20 hidden" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
