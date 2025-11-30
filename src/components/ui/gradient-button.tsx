"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gradientButtonVariants = cva(
  [
    "gradient-button",
    "inline-flex items-center justify-center gap-2",
    "rounded-full min-w-[132px] px-6 py-3",
    "text-base leading-[19px] font-[600]",
    "font-sans",
    "text-white",
    "shadow-md",
    "transition-all duration-400",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-[1.02]",
  ],
  {
    variants: {
      variant: {
        default: "",
        variant: "gradient-button-variant",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

GradientButton.displayName = "GradientButton"

export { GradientButton, gradientButtonVariants }

