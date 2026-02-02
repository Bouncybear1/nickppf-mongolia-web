"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { cn } from "@/lib/utils";

interface ContactFormProps {
    categories?: any[];
}

export default function ContactForm({ categories = [] }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        vin: "",
        service: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                    service: "",
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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const inputStyles =
        "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F4D23C] focus:ring-1 focus:ring-[#F4D23C] transition-all duration-300";

    return (
        <div className="flex flex-col gap-8">
            <div>
                <SectionSubtitle>Get in Touch</SectionSubtitle>
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
                    Let's discuss your project
                </h2>
                <p className="text-neutral-400 max-w-md">
                    Fill out the form below and our team will get back to you shortly to discuss how we can protect your vehicle.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm text-neutral-400">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Болд Батаа"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputStyles}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm text-neutral-400">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="boldoo@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputStyles}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm text-neutral-400">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="+976 9911-XXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputStyles}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="vin" className="text-sm text-neutral-400">
                            VIN (Арлын дугаар)
                        </label>
                        <input
                            type="text"
                            id="vin"
                            name="vin"
                            required
                            placeholder="Vehicle Identification Number"
                            value={formData.vin}
                            onChange={handleChange}
                            className={inputStyles}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="text-sm text-neutral-400">
                        Service Interested In
                    </label>
                    <div className="relative">
                        <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className={cn(inputStyles, "appearance-none cursor-pointer")}
                        >
                            <option value="" disabled className="bg-zinc-900 text-neutral-500">
                                Select a service
                            </option>
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.Title} className="bg-zinc-900">
                                    {cat.Title}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
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
                        placeholder="Tell us about your vehicle..."
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
