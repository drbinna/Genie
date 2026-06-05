"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Liquid-glass button: layered translucent surface that picks up the
 * shader background and refracts it through an SVG displacement filter.
 *
 * Layers (z-stack, bottom -> top):
 *  1. Backdrop blur + glass tint
 *  2. SVG turbulence/displacement filter (id="container-glass")
 *  3. Inner highlight + edge sheen via box-shadow
 *  4. Content (label / icon)
 */
const liquidButtonVariants = cva(
  // base
  "relative isolate inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium text-foreground transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 overflow-hidden backdrop-blur-xl",
  {
    variants: {
      variant: {
        // translucent white glass — the default
        default:
          "bg-white/10 text-white hover:bg-white/15 border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(255,255,255,0.08),0_8px_32px_-8px_rgba(0,0,0,0.5)]",
        // red-tinted glass
        destructive:
          "bg-red-500/20 text-red-50 hover:bg-red-500/30 border border-red-300/30 shadow-[inset_0_1px_0_0_rgba(255,200,200,0.35),inset_0_-1px_0_0_rgba(0,0,0,0.15),0_8px_32px_-8px_rgba(180,0,0,0.5)]",
        // cool cyan/blue
        cool:
          "bg-cyan-400/15 text-cyan-50 hover:bg-cyan-400/25 border border-cyan-200/30 shadow-[inset_0_1px_0_0_rgba(200,240,255,0.35),inset_0_-1px_0_0_rgba(0,0,0,0.1),0_8px_32px_-8px_rgba(0,180,255,0.4)]",
        // thin outline glass
        outline:
          "bg-transparent text-white/90 hover:bg-white/10 border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]",
        // muted glass
        secondary:
          "bg-white/5 text-white/80 hover:bg-white/10 border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]",
        // ghost, mostly invisible
        ghost:
          "bg-transparent text-white/80 hover:bg-white/10 border border-transparent",
        // link
        link: "bg-transparent text-white underline-offset-4 hover:underline border-none shadow-none backdrop-blur-none",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-8 px-3 text-xs gap-1.5",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-lg",
        xxl: "h-16 px-11 text-xl tracking-tight",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(liquidButtonVariants({ variant, size, className }))}
        {...props}
      >
        {/* refractive distortion layer (uses GlassFilter SVG defs) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 mix-blend-overlay"
          style={{ filter: "url(#container-glass)" }}
        />
        {/* top sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/15 to-transparent"
        />
        {children}
      </Comp>
    )
  }
)
LiquidButton.displayName = "LiquidButton"

/**
 * Inject once near the root of the app. Defines the SVG distortion filter
 * referenced by LiquidButton's refractive layer.
 */
function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves={1}
            seed={1}
            result="turbulence"
          />
          {/* Blur the turbulence pattern slightly */}
          <feGaussianBlur in="turbulence" stdDeviation={2} result="blurredNoise" />
          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale={70}
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          {/* Apply overall blur on the final result */}
          <feGaussianBlur in="displaced" stdDeviation={4} result="finalBlur" />
          {/* Output the result */}
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

export { LiquidButton, GlassFilter, liquidButtonVariants }
