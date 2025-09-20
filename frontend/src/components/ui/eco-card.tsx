import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ecoCardVariants = cva(
  "rounded-2xl border bg-card text-card-foreground shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-card",
        glass: "glass",
        gradient: "bg-gradient-card",
        success: "bg-gradient-success text-success-foreground",
        glow: "shadow-xl animate-pulse-glow",
      },
      hover: {
        none: "",
        lift: "hover:scale-105 hover:shadow-xl",
        glow: "hover:shadow-2xl hover:shadow-primary/20",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "lift",
    },
  }
);

export interface EcoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ecoCardVariants> {}

const EcoCard = forwardRef<HTMLDivElement, EcoCardProps>(
  ({ className, variant, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(ecoCardVariants({ variant, hover, className }))}
      {...props}
    />
  )
);
EcoCard.displayName = "EcoCard";

const EcoCardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
EcoCardHeader.displayName = "EcoCardHeader";

const EcoCardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
EcoCardTitle.displayName = "EcoCardTitle";

const EcoCardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
EcoCardDescription.displayName = "EcoCardDescription";

const EcoCardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
EcoCardContent.displayName = "EcoCardContent";

const EcoCardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
EcoCardFooter.displayName = "EcoCardFooter";

export {
  EcoCard,
  EcoCardHeader,
  EcoCardFooter,
  EcoCardTitle,
  EcoCardDescription,
  EcoCardContent,
};