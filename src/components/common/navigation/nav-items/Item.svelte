<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { cn } from '@/lib/cn';
  import { darkNavPaths } from '@/lib/constant';
  import { onMount } from 'svelte';

  export let pageUrl: string | undefined;
  export let externalUrl: string | undefined;
  export let title: string;

  let scrollY = 0;
  let innerHeight = 0;
  let anchorEl: HTMLAnchorElement;
  let textColor: 'white' | 'black';
  let anchorY = 0;
  let anchorHeight = 0;

  $: isDarkPage = darkNavPaths.includes($page.url.pathname);
  $: if ($page.url.pathname) {
    if (browser) scrollY = window.scrollY;

    if (!isDarkPage) setTextColor();
    else textColor = 'black';
  }

  onMount(() => {
    scrollY = window.scrollY;
    getBoundingClientRect();
  });

  function setTextColor() {
    textColor =
      anchorY + anchorHeight > innerHeight - scrollY ? 'black' : 'white';
  }

  function handleScroll() {
    getBoundingClientRect();
    if (!isDarkPage) setTextColor();
  }

  function getBoundingClientRect() {
    const { y, height } = anchorEl?.getBoundingClientRect();
    anchorY = y;
    anchorHeight = height;
  }
</script>

<svelte:window
  bind:scrollY
  bind:innerHeight
  on:scroll={handleScroll}
  on:resize={getBoundingClientRect} />
<a
  bind:this={anchorEl}
  style="color: {textColor};"
  href={pageUrl || externalUrl}
  class="navitem text-[0.84375rem] uppercase leading-[120%] tracking-[0.01688rem] lg:opacity-0">
  <span
    class={cn('origin-center break-words transition-all duration-500', {
      'font-semibold opacity-100': $page.url.pathname === pageUrl,
      'font-medium opacity-[0.64] hover:font-semibold hover:opacity-100':
        $page.url.pathname !== pageUrl,
    })}>
    {title}
  </span>
</a>
