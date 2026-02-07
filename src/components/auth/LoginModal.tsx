"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { login } from "@/lib/directus";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            // Reset form on close
            setPhone("");
            setPassword("");
            setError(null);
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await login(phone, password);
            if (data?.access_token) {
                // Store token (consider more secure storage in production)
                localStorage.setItem("directus_token", data.access_token);
                // Also set cookie if needed for server components, or just use context
                document.cookie = `directus_token=${data.access_token}; path=/; max-age=${data.expires || 3600}`;

                onClose();
                router.refresh(); // Refresh to update UI based on auth state
            }
        } catch (err: any) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl bg-[#111] border border-white/10 shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                <h2 className="text-xl font-bold text-white">Login</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-6">
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {error && (
                                        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+976 99119911"
                                            required
                                            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#F4D23C]/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-zinc-400">
                                                Password
                                            </label>
                                            <a href="#" className="text-xs text-[#F4D23C] hover:underline">
                                                Forgot password?
                                            </a>
                                        </div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#F4D23C]/50 transition-all"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-3 mt-4 text-base"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Logging in...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </Button>
                                </form>

                                <div className="text-center text-sm text-zinc-400 pt-2 border-t border-white/10">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/contact"
                                        onClick={onClose}
                                        className="font-medium text-[#F4D23C] hover:underline"
                                    >
                                        Contact us to Register
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
