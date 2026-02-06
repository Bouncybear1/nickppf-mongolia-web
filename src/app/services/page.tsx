import ServicesView from "@/components/services/ServicesView";
import CTA from "@/components/sections/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Үйлчилгээ | NickPPF Mongolia",
    description: "Манай үйлчилгээнүүд болон түгээмэл асуултууд",
};

export default function ServicesPage() {
    return (
        <main>
            <ServicesView />
            <CTA />
        </main>
    );
}
