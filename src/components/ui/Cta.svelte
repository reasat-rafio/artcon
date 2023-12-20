<script lang="ts">
  import { cn } from '@/lib/cn';
  import type { ClassValue } from 'clsx';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  type Variant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

  interface $$Props extends HTMLAnchorAttributes {
    variant?: Variant;
    className?: ClassValue | undefined;
  }

  export let variant: Variant = 'primary';
  export let className: ClassValue | undefined = undefined;

  const variantClasses: Record<Variant, string> = {
    primary: 'border border-quick-silver text-sonic-silver',
    secondary:
      'border border-white/50 text-white transition-colors duration-500 hover:bg-white hover:text-dark-gunmetal',
    tertiary: 'gradient-base-style  bg-transparent g-red-gray text-white',
    quaternary: 'gradient-base-style bg-transparent g-white text-dark-gunmetal',
  };
</script>

<a
  {...$$restProps}
  class={cn(
    'relative block h-fit w-fit min-w-[8.75rem] overflow-hidden rounded-[4rem] px-[2rem] py-[0.81rem] text-center text-[0.84375rem] font-medium uppercase tracking-[0.01688rem]',
    variantClasses[variant],
    className,
  )}
  href={$$props.href}>
  <slot />
</a>

<style>
  .gradient-base-style::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: opacity 500ms ease-in-out;
  }
  .gradient-base-style::after {
    content: '';
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: opacity 500ms ease-in-out;
  }
  .gradient-base-style:hover::before,
  .gradient-base-style:active::before,
  .gradient-base-style:focus::before {
    opacity: 0;
  }
  .gradient-base-style:hover::after,
  .gradient-base-style:active::after,
  .gradient-base-style:focus::after {
    opacity: 1;
  }

  .g-red-gray::before {
    background-image: linear-gradient(
      270deg,
      rgba(252, 0, 0, 0.5) 5.64%,
      rgba(0, 0, 0, 0.3) 94.07%
    );
  }
  .g-red-gray::after {
    background-image: linear-gradient(
      100deg,
      rgba(252, 0, 0, 0.5) 5.64%,
      rgba(0, 0, 0, 0.3) 94.07%
    );
  }
  .g-white::before {
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.4) 5.93%,
      rgba(255, 255, 255, 0.75) 94.36%
    );
  }
  .g-white::after {
    background-image: linear-gradient(
      360deg,
      rgba(255, 255, 255, 0.4) 5.93%,
      rgba(255, 255, 255, 0.75) 94.36%
    );
  }
</style>
