<script lang="ts">
  import { page } from '$app/stores';
  import type { NavProps } from '@/lib/types/common.types';

  export let nav: NavProps;
  let { menu } = nav;

  let scrollY = 0;
  let innerHeight = 0;
  let textColor: 'white' | 'black';
  $: textColor = scrollY > innerHeight * 0.6 ? 'black' : 'white';
</script>

<svelte:window bind:scrollY bind:innerHeight />
<aside class="fixed left-0 top-1/2 z-50 -translate-y-1/2">
  <nav class="mx-[40px] flex flex-col space-y-[23px]">
    {#each menu as { title, externalUrl, pageUrl }}
      <a
        style="color: {textColor};"
        href={pageUrl ?? externalUrl}
        class="text-button font-semibold uppercase transition-all duration-500 {$page
          .url.pathname === pageUrl
          ? 'opacity-100'
          : 'opacity-70 hover:opacity-100'}"
      >
        {title}
      </a>
    {/each}
  </nav>
</aside>
