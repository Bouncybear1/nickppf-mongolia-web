"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { cn } from "@/lib/utils";

interface ContactFormProps {
    categories?: any[];
}

export default function ContactForm({ categories = [] }: ContactFormProps) {
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        phone: string;
        vin: string;
        services: string[];
        message: string;
    }>({
        name: "",
        email: "",
        phone: "",
        vin: "", // Kept in state but removed from UI
        services: [],
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.services.length === 0) {
            alert("Please select at least one service.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Thank you! Your request has been submitted.");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    vin: "",
                    services: [],
                    message: "",
                });
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Error submitting form.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleService = (serviceTitle: string) => {
        setFormData((prev) => {
            const exists = prev.services.includes(serviceTitle);
            if (exists) {
                return { ...prev, services: prev.services.filter((s) => s !== serviceTitle) };
            } else {
                return { ...prev, services: [...prev.services, serviceTitle] };
            }
        });
    };

    const inputStyles =
        "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F4D23C] focus:ring-1 focus:ring-[#F4D23C] transition-all duration-300";

    return (
        <div className="flex flex-col gap-8">
            <div>
                <SectionSubtitle>Get in Touch</SectionSubtitle>
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
                    NickPPF захиалга өгөх
                </h2>
                <p className="text-neutral-400 ">
                    Таны захиалгын дагуу манай ажилтан холбогдож, баталгаажуулах болно.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Personal Info - 3 Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm text-neutral-400">
                            Овог нэр
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Болдоо Батаа"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputStyles}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm text-neutral-400">
                            Имэйл хаяг
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="boldoo@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputStyles}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm text-neutral-400">
                            Утасны дугаар
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="9911-XXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputStyles}
                        />
                    </div>
                </div>

                {/* Service Selection - Grid of Cards */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-neutral-400 flex justify-between items-center">
                        Үйлчилгээ сонгох
                        {formData.services.length > 0 && (
                            <span className="text-[#F4D23C] text-xs font-medium bg-[#F4D23C]/10 px-2 py-0.5 rounded-full">
                                {formData.services.length} Selected
                            </span>
                        )}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.map((cat: any) => {
                            const isSelected = formData.services.includes(cat.Title);

                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => toggleService(cat.Title)}
                                    className={cn(
                                        "relative aspect-square rounded-xl overflow-hidden group transition-all duration-300 border border-white/10",
                                        isSelected
                                            ? "ring-2 ring-[#F4D23C] ring-offset-2 ring-offset-zinc-950 opacity-100"
                                            : "opacity-80 hover:opacity-100"
                                    )}
                                >
                                    {/* Background Image */}
                                    {/* Using standard img tag for simplicity if next/image is tricky with dynamic domains not in config, 
                                        but preferred next/image. Let's try to use style background or img. */}
                                    {cat.Featured_image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${cat.Featured_image}`}
                                            alt={cat.Title}
                                            className={cn(
                                                "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                                                isSelected ? "grayscale-0 scale-105" : "grayscale-[60%]"
                                            )}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-neutral-800" />
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                                    {/* Title */}
                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <span className="text-white font-medium text-center text-lg md:text-xl drop-shadow-md">
                                            {cat.Title}
                                        </span>
                                    </div>

                                    {/* Checkmark indicator for better UX */}
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 bg-[#F4D23C] text-black rounded-full p-1">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-neutral-400">
                        Message (Optional)
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Та авах үйлчилгээнийхээ тухай дэлгэрэнгүй оруулна уу"
                        value={formData.message}
                        onChange={handleChange}
                        className={cn(inputStyles, "resize-none")}
                    />
                </div>

                <div className="mt-2">
                    <Button
                        type="submit"
                        variant="yellow"
                        className="w-full md:w-auto"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
