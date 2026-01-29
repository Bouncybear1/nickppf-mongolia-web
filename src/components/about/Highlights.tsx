"use client";

import { motion } from "framer-motion";
import { about_us_content, getDirectusFileUrl } from "@/lib/directus";

interface HighlightsProps {
    data: about_us_content;
}

export default function Highlights({ data }: HighlightsProps) {

    const highlights = [
        {
            title: data.highlight_title,
            description: data.highlight_description,
            image: getDirectusFileUrl(data.highlight_image),
        },
        {
            title: data.highlight_title_2,
            description: data.highlight_description_2,
            image: getDirectusFileUrl(data.highlight_image_2),
        },
        {
            title: data.highlight_title_3,
            description: data.highlight_description_3,
            image: getDirectusFileUrl(data.highlight_image_3),
        }
    ];

    // Sticky Configuration
    const BASE_TOP = 150; // Initial sticky position (px), clear of navbar
    const ITEM_OFFSET = 120; // Height of the visible title strip for the next card to peek under

    return (
        <section className="bg-black text-white relative">
            <div className="mx-auto max-w-[1440px] px-6 pb-24">

                <div className="flex flex-col">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="bg-black border-t border-white/10" // Solid background to cover previous content
                            style={{
                                position: 'sticky',
                                top: `${BASE_TOP + (index * ITEM_OFFSET)}px`, // Dynamic sticky offset
                                minHeight: '50vh', // Ensure enough height so it sticks around
                                paddingTop: '3rem', // Spacing inside the card
                                marginBottom: `${index === highlights.length - 1 ? 0 : 50}px` // Spacing to allow scroll
                            }}
                        >
                            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                                {/* Left: Title (Visible Strip) */}
                                <div className="w-full flex flex-col gap-12 pb-12">
                                    <div className="w-full">
                                        <h3 className="text-[2rem] font-medium text-white leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div
                                        className="text-lg leading-relaxed text-zinc-400 prose prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                </div>
                                {/* Right: Content */}


                                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-800 border border-white/10">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>


                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
