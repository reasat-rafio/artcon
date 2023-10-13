<script lang="ts">
  import { page } from '$app/stores';
  import type { NavProps } from '@/lib/types/common.types';
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  export let nav: NavProps;
  let { menu } = nav;

  let scrollY = 0;
  let innerHeight = 0;
  let textColor: 'white' | 'black';
  $: textColor = scrollY > innerHeight * 0.6 ? 'black' : 'white';
</script>

<svelte:window bind:scrollY bind:innerHeight />
<aside class="fixed left-0 top-1/2 z-[1000] hidden -translate-y-1/2 lg:block">
  <nav class="mx-[40px] flex flex-col space-y-[23px]">
    {#each menu as { title, externalUrl, pageUrl }}
      <a
        style="color: {textColor};"
        href={pageUrl ?? externalUrl}
        class={twMerge(
          'navitem text-button uppercase lg:space-y-[20px] lg:opacity-0',
        )}
      >
        <span
          class={twMerge(
            'transition-all duration-500',
            $page.url.pathname === pageUrl
              ? 'font-semibold opacity-100'
              : 'opacity-70 hover:font-semibold hover:opacity-100 ',
          )}
        >
          {title}
        </span>
      </a>
    {/each}
  </nav>
</aside>
