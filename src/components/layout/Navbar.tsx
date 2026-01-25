"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // Assumes utils exists or we need to create it for clsx
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 50) {
            setIsHidden(true); // Scrolling down
        } else {
            setIsHidden(false); // Scrolling up
        }
        setIsScrolled(latest > 50);
    });

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Articles", href: "/articles" },
        { name: "Services", href: "/services" },
        { name: "About Us", href: "/about" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                isScrolled ? "py-4" : "py-6"
            )}
        >
            <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6">

                {/* Left Section: Box with Logo and Menu */}
                <div className={cn(
                    "flex items-center gap-6 rounded-[6px] px-6 py-3 transition-all",
                    "bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-lg"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 overflow-hidden">
                        <Image
                            src="/icon.svg"
                            alt="NickPPF Icon"
                            width={32}
                            height={32}
                            className=" z-20 relative"
                        />
                        <motion.div
                            initial={{ x: 0, opacity: 1, width: "auto" }}
                            animate={{
                                x: isHidden ? -50 : 0,
                                opacity: isHidden ? 0 : 1,
                                width: isHidden ? 0 : "auto",
                                marginLeft: isHidden ? 0 : 8 // managed margin
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center overflow-hidden"
                            style={{ marginLeft: 8 }} // Default margin
                        >
                            <Image
                                src="/logo.svg"
                                alt="NickPPF Logo"
                                width={80}
                                height={24}
                                className="shrink-0"
                            />
                        </motion.div>
                    </Link>

                    {/* Divider */}
                    <div className="h-6 w-px bg-white/20 hidden md:block" />

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 rounded-xs">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Section: Auth Buttons */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:inline-block">
                        <Button variant="black" className="px-6 py-2.5 text-sm font-medium">
                            Register
                        </Button>
                    </div>
                    <div className="hidden md:inline-block">
                        <Button variant="yellow" className="px-6 py-2.5 text-sm font-bold">
                            Login
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="rounded-full bg-zinc-900/80 p-3 text-white backdrop-blur-md md:hidden border border-white/10"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-[60] bg-zinc-950 p-6 md:hidden"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-2xl font-bold text-white">Menu</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-white/90"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-8 flex flex-col gap-4">
                                <Button className="w-full py-4 text-lg font-medium">
                                    Register
                                </Button>
                                <Button className="w-full py-4 text-lg font-bold">
                                    Login
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
