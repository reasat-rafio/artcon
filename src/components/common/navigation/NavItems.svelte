<script lang="ts">
  import { page } from '$app/stores';
  import type { NavProps } from '@/lib/types/common.types';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { cn } from '@/lib/cn';
  import { darkNavPaths } from '@/lib/constant';

  export let nav: NavProps;
  let { menu } = nav;

  let scrollY = 0;
  let innerHeight = 0;
  let textColor: 'white' | 'black';
  $: textColor = darkNavPaths.includes($page.url.pathname)
    ? 'black'
    : scrollY > innerHeight * 0.6
      ? 'black'
      : 'white';

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
  class="!fixed left-0 top-1/2 z-[1004] hidden h-full w-[11rem] -translate-y-1/2 items-center lg:flex 2xl:w-[16rem]">
  <nav class="ml-[2.5rem] flex flex-col gap-y-[1.25rem]">
    {#each menu as { title, externalUrl, pageUrl }}
      <a
        style="color: {textColor};"
        href={pageUrl || externalUrl}
        class={cn(
          'navitem text-[0.84375rem] uppercase leading-[120%] tracking-[0.01688rem] lg:opacity-0',
        )}>
        <span
          class={cn('origin-center break-words transition-all duration-500', {
            'font-semibold opacity-100': $page.url.pathname === pageUrl,
            'font-medium opacity-[0.64] hover:font-semibold hover:opacity-100':
              $page.url.pathname !== pageUrl,
          })}>
          {title}
        </span>
      </a>
    {/each}
  </nav>
</aside>
