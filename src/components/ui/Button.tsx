"use client";

import * as React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "yellow" | "black";
    href?: string;
    target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "yellow", children, href, onClick, target, ...props }, ref) => {

        // Base Wrapper: relative for positioning the absolute arrow box
        const wrapperStyles = "group/button relative inline-flex items-center justify-center";

        // Text Box Styles
        const textBoxBase = "relative z-20 flex h-[47px] items-center justify-center rounded-[8px] px-6 text-sm font-medium transition-colors duration-100 border";

        // Arrow Box Styles
        const arrowBoxBase = "absolute z-10 flex h-[47px] w-[47px] items-center justify-center rounded-full transition-all duration-300 ease-out opacity-0 -translate-x-4 group-hover/button:translate-x-[calc(100%-5px)] group-hover/button:opacity-100 border";

        const variants = {
            yellow: {
                text: "bg-[#F4D23C] text-black border-transparent radius-[8px] text-[1.2rem] font-medium",
                arrow: "bg-[#F4D23C] text-black border-transparent text-[1.2rem] font-medium",
            },
            black: {
                text: "bg-white/10 hover:bg-white/20 text-white border-transparent rounded-[8px] text-[1.2rem] font-medium shadow-[inset_0_0_2px_rgba(255,255,255,0.4)] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.25)]",
                arrow: "bg-[#F4D23C] text-black border-[#F4D23C] text-[1.2rem] font-medium",
            },
        };

        const selectedVariant = variants[variant];

        const Content = (
            <>
                {/* Visual Text Box */}
                <span className={cn(textBoxBase, selectedVariant.text, className)}>
                    {children}
                </span>

                {/* Animated Arrow Box */}
                <span className={cn(
                    "absolute right-0 z-10 flex h-[47px] w-[47px] items-center justify-center rounded-full border border-inherit shadow-lg", // base layout
                    selectedVariant.arrow,
                    "transition-all duration-300 ease-out", // animation props
                    "opacity-0", // initial state: hidden
                    "group-hover/button:translate-x-full group-hover/button:opacity-100 group-hover/button:rotate-[45deg]" // hover state: slides right, visible, full size, rotated box
                )}>
                    {/* Arrow Icon - fills the box implies reasonable size */}
                    <ArrowUp className="h-6 w-6" /> {/* Icon distinct from box rotation? User said 'arrow... turns 45 deg'. Box rotating rotates arrow. */}
                </span>
            </>
        );

        if (href) {
            return (
                <NextLink
                    href={href}
                    target={target}
                    className={wrapperStyles}
                    onClick={onClick as any}
                >
                    {Content}
                </NextLink>
            );
        }

        return (
            <button
                ref={ref}
                className={wrapperStyles}
                onClick={onClick}
                {...props}
            >
                {Content}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
