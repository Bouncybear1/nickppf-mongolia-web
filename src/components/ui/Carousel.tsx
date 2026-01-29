"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { getDirectusFileUrl } from '@/lib/directus';
import { Trophy, FileBadge } from 'lucide-react';

interface CarouselItem {
    id: number;
    title: string;
    image: string | null;
}

interface CarouselProps {
    items: CarouselItem[];
    placeholderIcon?: 'trophy' | 'certificate';
}

export default function Carousel({ items, placeholderIcon = 'trophy' }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', slidesToScroll: 1 },
        [Autoplay({ delay: 1500, stopOnInteraction: false, stopOnMouseEnter: true })]
    );

    return (
        <div className="relative">
            {/* Carousel Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-6 relative group cursor-pointer">
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/10">
                                {item.image ? (
                                    <img
                                        src={getDirectusFileUrl(item.image)}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center">
                                        {placeholderIcon === 'trophy' ? (
                                            <Trophy className="h-16 w-16 text-zinc-700" />
                                        ) : (
                                            <FileBadge className="h-16 w-16 text-zinc-700" />
                                        )}
                                    </div>
                                )}

                                {/* Inner Shadow & Title Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                                    <div className="w-full border-t-[2px] border-[#F4D23C]">
                                        <h3 className="text-lg font-medium text-[1.6rem] text-white line-clamp-2">{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient Masks (Clipping Shadows) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[25%] bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[25%] bg-gradient-to-l from-black via-black/50 to-transparent z-10" />
        </div>
    );
}
