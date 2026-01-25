import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import ProductStickyScroll from "@/components/sections/ProductStickyScroll";
import Articles from "@/components/sections/Articles";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <AboutUs />
      <ProductStickyScroll />
      <CTA />
      <Articles />
    </div>
  );
}
