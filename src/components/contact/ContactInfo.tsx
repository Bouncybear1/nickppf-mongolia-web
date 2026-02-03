"use client";

import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactInfo() {
    return (
        <div className="flex flex-col gap-8 h-full">
            <div>
                <SectionSubtitle>Contact Information</SectionSubtitle>
                <h2 className="text-3xl font-medium text-white mb-6">
                    Бидэнтэй холбогдох
                </h2>

                <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg shrink-0 text-[#F4D23C]">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-2 tracking-[0.05rem]">Байршил</h3>
                            <p className="text-neutral-400 tracking-[0.05em]">
                                СХД, 13-р хороо, Өнөр төв 2 давхар, NICKPPFMongolia
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg shrink-0 text-[#F4D23C]">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-1 tracking-[0.05rem]">Утасны дугаар</h3>
                            <p className="text-neutral-400 tracking-[0.05em]">
                                <a href="tel:+97699900993" className="hover:text-white transition-colors">
                                    +976 9990 0993
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg shrink-0 text-[#F4D23C]">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-1 tracking-[0.05rem]">Имэйл хаяг</h3>
                            <p className="text-neutral-400 tracking-[0.05em]">
                                <a href="mailto:info@nickppf.mn" className="hover:text-white transition-colors">
                                    info@nickppf.mn
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg shrink-0 text-[#F4D23C]">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-1 tracking-[0.05rem]">Ажлын цаг</h3>
                            <p className="text-neutral-400 tracking-[0.05em]">
                                Mon - Fri: 09:00 - 18:00
                                <br />
                                Sat: 10:00 - 15:00
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[300px] md:h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/10 relative bg-zinc-900 mt-4">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15549.99759294394!2d106.85857840795498!3d47.91380756816964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693d7f4fad237%3A0x696b1a4cfb8a8a9e!2zR1MyNSDTqNC906nRgCDRgtOp0LI!5e0!3m2!1sen!2smn!4v1770026353564!5m2!1sen!2smn"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-80 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
            </div>
        </div>
    );
}
