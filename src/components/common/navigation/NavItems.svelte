<script lang="ts">
  import { page } from '$app/stores';
  import type { NavProps } from '@/lib/types/common.types';
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';
  import gsap from 'gsap';

  export let nav: NavProps;
  let { menu } = nav;

  let scrollY = 0;
  let innerHeight = 0;
  let textColor: 'white' | 'black';
  $: textColor = scrollY > innerHeight * 0.6 ? 'black' : 'white';

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.to('.navitem', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: 'expoOut',
      });
    });
    return () => ctx.revert();
  });
</script>

<svelte:window bind:scrollY bind:innerHeight />
<aside
  class="!fixed left-0 top-1/2 z-[1000] hidden h-full w-[11rem] -translate-y-1/2 items-center lg:flex 2xl:w-[16rem]">
  <nav class="ml-[2.5rem] mr-[0.625rem] flex flex-col space-y-[1.438rem]">
    {#each menu as { title, externalUrl, pageUrl }}
      <a
        style="color: {textColor};"
        href={pageUrl ?? externalUrl}
        class={twMerge(
          'navitem text-button uppercase lg:space-y-[20px] lg:opacity-0 ',
        )}>
        <span
          class={twMerge(
            'break-words transition-all duration-500',
            $page.url.pathname === pageUrl
              ? 'font-semibold opacity-100'
              : 'opacity-70 hover:font-semibold hover:opacity-100 ',
          )}>
          {title}
        </span>
      </a>
    {/each}
  </nav>
</aside>
