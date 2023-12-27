<script lang="ts">
  import { page } from '$app/stores';
  import { cn } from '@/lib/cn';
  import { darkNavPaths } from '@/lib/constant';

  export let pageUrl: string | undefined;
  export let externalUrl: string | undefined;
  export let title: string;

  let scrollY = 0;
  let innerHeight = 0;
  let anchorEl: HTMLAnchorElement;
  let textColor: 'white' | 'black';
  $: isDarkPage = darkNavPaths.includes($page.url.pathname);
  $: $page.url.pathname, (textColor = isDarkPage ? 'black' : 'white');

  function handleScroll() {
    const { y, height } = anchorEl.getBoundingClientRect();
    if (!isDarkPage)
      textColor = y + height > innerHeight - scrollY ? 'black' : 'white';
  }
</script>

<svelte:window bind:scrollY bind:innerHeight on:scroll={handleScroll} />
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
