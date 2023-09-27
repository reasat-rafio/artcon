<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let href: string;
  export let color: 'gray' | 'white' | 'black' | 'red-gray' = 'gray';
  export let variant: 'outline' | 'fill' = 'outline';
</script>

<a
  {href}
  class={twMerge(
    'block w-fit overflow-hidden rounded-[4rem] border px-[1rem] py-[0.88rem] text-center text-[0.6875rem] font-medium tracking-[0.01688rem] lg:px-[2.2rem] lg:text-[0.84375rem]',
    variant === 'outline'
      ? color === 'gray'
        ? 'border-sonic-silver/60 text-sonic-silver'
        : color === 'white'
        ? 'border-white text-white transition-colors duration-500 hover:bg-white hover:text-dark-gunmetal'
        : null
      : variant === 'fill'
      ? color === 'red-gray'
        ? 'red-gray relative bg-transparent text-white '
        : null
      : null,
    $$props.class,
  )}
>
  <slot />
</a>

<style>
  .red-gray::before {
    content: '';
    background-image: linear-gradient(
      270deg,
      rgba(252, 0, 0, 0.5) 5.64%,
      rgba(0, 0, 0, 0.3) 94.07%
    );
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: opacity 500ms ease-in-out;
  }
  .red-gray::after {
    content: '';
    opacity: 0;
    background-image: linear-gradient(
      100deg,
      rgba(252, 0, 0, 0.5) 5.64%,
      rgba(0, 0, 0, 0.3) 94.07%
    );
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: opacity 500ms ease-in-out;
  }
  .red-gray:hover::before,
  .red-gray:active::before,
  .red-gray:focus::before {
    opacity: 0;
  }
  .red-gray:hover::after,
  .red-gray:active::after,
  .red-gray:focus::after {
    opacity: 1;
  }
</style>
