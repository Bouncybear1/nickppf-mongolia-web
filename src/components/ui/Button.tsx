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
        const wrapperStyles = "group relative inline-flex items-center justify-center";

        // Text Box Styles
        const textBoxBase = "relative z-20 flex items-center justify-center rounded-[8px] px-6 py-3 text-sm font-medium transition-colors duration-100 border";

        // Arrow Box Styles
        const arrowBoxBase = "absolute z-10 flex h-[47px] w-[47px] items-center justify-center rounded-full transition-all duration-300 ease-out opacity-0 -translate-x-4 group-hover:translate-x-[calc(100%-20px)] group-hover:opacity-100 border";
        // Note: translate calculation places it to the right. 
        // Initial: Hidden behind text box.
        // Hover: Moves to right. We used right-0 anchor? No, let's use left anchor and translate.
        // Better: Anchor the Arrow Box to the *right* of the element but with negative margin/translate? 
        // Let's rely on standard absolute positioning. 
        // Ideally, `right-0` of wrapper.
        // Since wrapper wraps Text Box, `right-0` is the right edge of Text Box.
        // We want it to move OUTSIDE the text box to the right.
        // So `right-0` -> `translate-x-[100% + gap]`.

        const variants = {
            yellow: {
                text: "bg-[#F4D23C] text-black border-transparent",
                arrow: "bg-[#F4D23C] text-black border-transparent",
            },
            black: {
                text: "bg-black/10 text-white border-white",
                arrow: "bg-black/80 text-white border-white", // Increased opacity for visibility on bg? Or match text box? "FFFFFF 0.1 opacity" for text box. Arrow box likely same?
            },
        };

        // Refined Black Variant: 
        // User said: "F4D23C background...". "Button-black should have FFFFFF 0.1 opacity background..."
        const selectedVariant = variants[variant];

        // Arrow Position Adjustment
        // To make it come from "behind", we center it or place it within the text box area initially.
        // We anchor it to the right side of the wrapper.
        // group-hover:translate-x-[60%] or specific px?
        // Let's use `right-[10px]` initially (hidden) -> `right-[-60px]` on hover?
        // Actually, allow Flex behavior? No user said "not enlarge content". Absolute is best.

        const Content = (
            <>
                {/* Visual Text Box */}
                <span className={cn(textBoxBase, selectedVariant.text, className)}>
                    {children}
                </span>

                {/* Animated Arrow Box */}
                <span className={cn(
                    "relative right-10 z-10 flex h-[47px] w-[47px] items-center justify-center rounded-full border border-inherit shadow-lg", // base layout
                    selectedVariant.arrow,
                    "transition-all duration-300 ease-out", // animation props
                    "opacity-0 scale-50", // initial state: hidden, small
                    "group-hover:translate-x-[120%] group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-[45deg]" // hover state: slides right, visible, full size, rotated box
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
