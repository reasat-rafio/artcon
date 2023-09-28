<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface $$Props extends HTMLAnchorAttributes {
    color?: 'gray' | 'white' | 'black' | 'red-gray';
    variant?: 'outline' | 'fill';
  }

  export let color: 'gray' | 'white' | 'black' | 'red-gray' = 'gray';
  export let variant: 'outline' | 'fill' = 'outline';
</script>

<a
  href={$$props.href}
  {...$$restProps}
  class={twMerge(
    'block w-fit overflow-hidden rounded-[4rem] border px-[1rem] py-[0.88rem] text-center text-[0.6875rem] font-medium tracking-[0.01688rem] lg:px-[2.2rem] lg:text-[0.84375rem]',
    variant === 'fill' && 'gradient-base-style relative bg-transparent',
    variant === 'outline'
      ? color === 'gray'
        ? 'border-sonic-silver/60 text-sonic-silver'
        : color === 'white'
        ? 'border-white text-white transition-colors duration-500 hover:bg-white hover:text-dark-gunmetal'
        : null
      : variant === 'fill'
      ? color === 'red-gray'
        ? 'g-red-gray text-white'
        : color === 'white'
        ? 'g-white !border-none text-dark-gunmetal'
        : null
      : null,
    $$props.class,
  )}
>
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
