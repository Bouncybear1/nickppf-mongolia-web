import { WordFadeIn } from "../ui/WordFadeIn";

export default function Hero() {
    return (
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-black text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
                    alt="NickPPF Workshop"
                    className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            </div>

            <div className="relative z-20 mx-auto flex h-full max-w-[1440px] flex-col justify-end items-start px-6 pb-20 md:pb-[40px]">
                <WordFadeIn
                    words="Дэлхийн хэмжээний чанар,"
                    className="text-4xl font-medium tracking-tight md:text-7xl lg:text-8xl text-left text-white"
                    delay={0}
                />
                <WordFadeIn
                    words="Монгол үйлчилгээ"
                    className="text-4xl font-medium tracking-tight md:text-7xl lg:text-8xl text-left mt-2 text-zinc-400"
                    delay={0.3}
                />
            </div>
        </section>
    );
}
