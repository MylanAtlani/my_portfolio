import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 focus-nothing disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'nothing-button',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl px-6 py-3',
        outline: 'nothing-button-outline',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl px-6 py-3',
        ghost: 'hover:bg-muted/20 hover:text-foreground rounded-xl px-6 py-3',
        link: 'text-primary underline-offset-4 hover:underline px-0',
      },
      size: {
        default: 'px-6 py-3 text-sm',
        sm: 'px-4 py-2 text-xs rounded-lg',
        lg: 'px-8 py-4 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants }; 