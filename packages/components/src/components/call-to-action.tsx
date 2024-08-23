import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../cn';
import { Anchor } from './anchor';

const variantStyles = {
  primary: cn(
    'bg-primary hover:bg-green-800 hover:text-white' +
      ' focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800',
  ),
  'primary-inverted': cn(
    'bg-primary hover:bg-white' +
      ' focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-white/40',
  ),
  secondary: cn(
    'bg-green-300 hover:bg-green-200' +
      ' focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-300/40',
  ),
  'secondary-inverted': cn(
    'bg-green-800 hover:bg-green-700 text-white' +
      ' focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800/40',
  ),
  tertiary: cn(
    'bg-transparent text-green-1000' +
      ' focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800',
  ),
};

type CallToActionVariant = keyof typeof variantStyles;

export interface CallToActionProps extends ComponentPropsWithoutRef<typeof Anchor> {
  href: string;
  variant: CallToActionVariant;
}

/**
 * This is called `Button` in Figma in the new Hive brand design system.
 * It's a styled variant of {@link Anchor}.
 *
 * // TODO: Consider changing it to use `<button />` if `href` is not given and rename it to `Button`.
 */
export function CallToAction({ className, variant, ...rest }: CallToActionProps) {
  return (
    <Anchor
      className={cn(
        'relative block rounded-lg sm:w-fit' +
          ' px-6 py-3 font-medium leading-6 text-green-1000' +
          ' relative flex flex-row items-center justify-center gap-2',
        'focus-visible:ring-0 focus-visible:ring-offset-0',
        '[&:hover>:first-child]:inset-[-1px] [&:hover>:first-child]:rounded-[9px]',
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      <div className="absolute inset-0 rounded-lg border border-green-800" />
      {rest.children}
    </Anchor>
  );
}
