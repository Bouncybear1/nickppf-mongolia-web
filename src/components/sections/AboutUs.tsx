"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";

// Feature Cards Data
const features = [
    {
        image: "/images/about/rhino-logo.png",
        title: "EST. 1999",
        description: "27 жилийн турш хуримтлуулсан түүх, баталгаатай туршлага"
    },
    {
        image: "/images/about/globe-logo.png",
        title: "20 Сая",
        description: "Өндөр гүйцэтгэлтэй 26 төрлийн автомашины хуулга, 20 сая автомашин"

    },
    {
        image: "/images/about/factory-logo.png",
        title: "4000+",
        description: "БНХАУ-д 4,000+ албан ёсны суурилуулалтын төв"
    },
    {
        image: "/images/about/certificate-logo.png",
        title: "300+",
        description: "Өндөр зэрэглэлийн флагшип дэлгүүр"
    }
];

export default function AboutUs() {
    return (
        <section className="bg-zinc-950 py-24 text-white">
            <div className="mx-auto max-w-[1440px] px-6 flex flex-col gap-12 md:gap-24">

                {/* Top Section: Image + Content */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">

                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full lg:w-1/2 min-h-[436px] lg:min-h-full shrink-0 overflow-hidden rounded-[8px] border border-white/10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
                            alt="NickPPF Workshop"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>

                    {/* Right: Content */}
                    <div className="flex flex-col justify-center py-4">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <SectionSubtitle>
                                Бидний тухай
                            </SectionSubtitle>
                            <h2 className="mb-6 text-4xl font-medium leading-tight md:text-5xl">
                                NICK Дэлхийн хэмжээний автомашины хамгаалалтын хуулга үйлдвэрлэгч брэнд
                            </h2>
                            <div className="space-y-6 text-md text-white/60 max-w-2xl">
                                <p>
                                    1999 онд байгуулагдсан NICK нь автомашины хуулганы салбарт 20 гаруй жилийн туршлага, баталгаатай чанараараа танигдсан ахмад брэнд юм. Судалгаа, хөгжүүлэлт (R&D), үйлдвэрлэл, борлуулалт, үйлчилгээ бүрэн нэгтгэсэн бүтэцтэй бөгөөд дараах гурван үндсэн бүтээгдэхүүний чиглэлээр мэргэшсэн:
                                </p>
                            </div>

                            <div className="mt-10">
                                <Button href="/about" variant="black">
                                    Дэлгэрэнгүй
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: 4 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden flex flex-col items-start p-6 rounded-[8px] bg-[#0F0F0F] border border-black transition-colors shadow-[inset_0_2px_2px_rgba(255,255,255,0.08)]"
                        >
                            {/* Decorative Box */}
                            <div className="absolute top-[-30px] left-[-11px] w-[110px] h-[64px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(50%_50%_at_50%_50%,#F4D23C_0%,rgba(244,210,60,0)_100%)] blur-[12px] pointer-events-none" />
                            <div className="absolute top-0 left-6 w-[40px] h-[4px] bg-[#2A2A2A] rounded-bl-[3px] rounded-br-[3px] transition-colors duration-500 group-hover:bg-[#F4D23C]" />

                            <div className="relative z-10 w-12 h-12 mb-4">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <h3 className="relative z-10 text-[2rem] tracking-[-0.01em] leading-[1.2] font-medium text-white mb-2">{feature.title}</h3>
                            <p className="relative z-10 text-base tracking-[0.04em] leading-[1.2] font-book text-white/80">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
