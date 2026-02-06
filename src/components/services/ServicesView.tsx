"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WordFadeIn } from "@/components/ui/WordFadeIn";
import { Accordion } from "@/components/ui/Accordion";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { cn } from "@/lib/utils";

// Mock Data
const SERVICE_CATEGORIES = [
    {
        id: "ppf",
        title: "Paint Protection Film",
        description: "Дээд зэрэглэлийн хамгаалалтын хуулга",
        faqs: [
            {
                title: "PPF гэж юу вэ?",
                content: "Paint Protection Film (PPF) нь автомашины будгийг зураас, чулууны цохилт, химийн бодис болон нарны хэт ягаан туяанаас хамгаалах зориулалттай тусгай полиуретан хальс юм.",
            },
            {
                title: "PPF наалгасны дараа машин угааж болох уу?",
                content: "Тийм ээ, гэхдээ наалгасны дараа эхний 7 хоногт угаахгүй байхыг зөвлөж байна. Үүний дараа та ердийн угаалгаар угаалгаж болно.",
            },
            {
                title: "Эдэлгээний хугацаа хэдэн жил вэ?",
                content: "Манай ашигладаг дээд зэрэглэлийн хуулгууд нь 5-10 жилийн баталгаат хугацаатай бөгөөд зөв арчилгаа хийвэл түүнээс ч удаан тэсвэрлэх чадвартай.",
            },
        ],
    },
    {
        id: "ceramic",
        title: "Ceramic Coating",
        description: "Керамик бүрхүүл ба өнгөлгөө",
        faqs: [
            {
                title: "Керамик бүрхүүл гэж юу вэ?",
                content: "Керамик бүрхүүл нь машины гадаргууд химийн аргаар барьцалдан тогтож, удаан эдэлгээтэй, ус бохирдол түлхэх шинж чанартай хамгаалах давхарга үүсгэдэг.",
            },
            {
                title: "Өнгөлгөөний дараа хэр удаан гялалзах вэ?",
                content: "Керамик бүрхүүл нь 1-3 жилийн хугацаанд машины гялалзсан байдлыг хадгалж, угаахад хялбар болгодог.",
            },
        ],
    },
    {
        id: "tinting",
        title: "Window Tinting",
        description: "Цонхны тень ба дулаан тусгаарлалт",
        faqs: [
            {
                title: "Танайх ямар брэндийн тень ашигладаг вэ?",
                content: "Бид хэт ягаан туяаг 99% хаадаг, дулаан тусгаарлалт өндөртэй дэлхийн шилдэг брэндүүдийн тенийг ашигладаг.",
            },
            {
                title: "Тень наалгаснаар үзэгдэх орчин хязгаарлагдах уу?",
                content: "Үгүй, манай санал болгож буй тениуд нь гаднаасаа харагдах байдлыг бууруулах боловч дотроосоо маш цэвэр, тод үзэгдэх орчинг бүрдүүлдэг.",
            },
        ],
    },
    {
        id: "detailing",
        title: "Deep Detailing",
        description: "Гүн цэвэрлэгээ ба арчилгаа",
        faqs: [
            {
                title: "Салон цэвэрлэгээнд хэр удаан хугацаа шаардагдах вэ?",
                content: "Машины бохирдлын зэргээс шалтгаалан бүрэн цэвэрлэгээ хийхэд 1-2 өдөр шаардагдана.",
            },
            {
                title: "Химийн бодис нь хүний биед хортой юу?",
                content: "Бид хүний эрүүл мэнд болон байгаль орчинд ээлтэй, олон улсын стандартад нийцсэн бүтээгдэхүүнүүдийг ашигладаг.",
            },
        ],
    },
];

export default function ServicesView() {
    const [activeServiceId, setActiveServiceId] = useState(SERVICE_CATEGORIES[0].id);

    const activeService = SERVICE_CATEGORIES.find((s) => s.id === activeServiceId) || SERVICE_CATEGORIES[0];

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Standardized Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] flex flex-col justify-end items-start overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop"
                        alt="Services"
                        className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                </div>

                <div className="relative z-20 w-full max-w-[1440px] mx-auto flex flex-col justify-end items-start px-6 pb-20 md:pb-[40px]">
                    <SectionSubtitle>ҮЙЛЧИЛГЭЭ БОЛОН ТҮГЭЭМЭЛ АСУУЛТ ХАРИУЛТ</SectionSubtitle>
                    <WordFadeIn
                        words="Танд асуулт байна уу?"
                        className="text-3xl font-medium tracking-tight md:text-6xl lg:text-7xl text-left text-white leading-[1.2]"
                        delay={0}
                    />
                    <WordFadeIn
                        words="Бид танд туслахад бэлэн байна."
                        className="text-3xl font-medium tracking-tight md:text-6xl lg:text-7xl text-left text-white/80 leading-[1.2]"
                        delay={0}
                    />
                </div>
            </div>

            {/* Content Section - 1:2.5 Ratio Split */}
            <div className="max-w-[1600px] mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 lg:gap-24">
                    {/* Left Column - Categories */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex flex-col mt-6 border-t border-white/10">
                                {SERVICE_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveServiceId(cat.id)}
                                        className={cn(
                                            "text-left font-mono text-md py-4 border-b border-white/10 transition-all duration-300 group relative",
                                            activeServiceId === cat.id ? "text-zinc-500 bg-[#121212]" : "text-zinc-500 hover:text-white"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-md md:text-lg font-light uppercase tracking-wide block transition-transform duration-300",
                                            activeServiceId === cat.id ? "translate-x-4" : "group-hover:translate-x-2"
                                        )}>
                                            {cat.title}
                                        </span>
                                        {/* Active Indicator */}
                                        <span className={cn(
                                            "absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#F4D23C] rounded-full transition-all duration-300",
                                            activeServiceId === cat.id ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                        )} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Accordion */}
                    <motion.div
                        key={activeService.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >

                        <Accordion items={activeService.faqs} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
