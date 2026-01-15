<script lang="ts">
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { cn } from '@/lib/cn';
  import { darkNavPaths } from '@/lib/constant';
  import uiStore from '@/store/ui';
  import { onMount } from 'svelte';

  export let pageUrl: string | undefined;
  export let externalUrl: string | undefined;
  export let title: string;
  export let index: number;

  let scrollY = 0;
  let innerHeight = 0;
  let anchorEl: HTMLAnchorElement;
  $: isDarkPage = darkNavPaths.includes($page.url.pathname);
  $: textColor = $uiStore.navItemsColor[index];

  onMount(() => {
    if (browser) scrollY = window.scrollY;
    setTextColor();
  });

  afterNavigate(() => {
    if (browser) scrollY = window.scrollY;
    setTextColor();
  });

  function setTextColor() {
    const { y, height } = anchorEl?.getBoundingClientRect();
    const yOffset = y + height + scrollY;

    if (!!$uiStore.imageAssetPos?.length) {
      $uiStore.imageAssetPos.forEach(({ y: assetY }) => {
        const color = isDarkPage
          ? 'black'
          : yOffset > assetY && yOffset < assetY + window.innerHeight
            ? 'white'
            : 'black';

        uiStore.setNavItemColorAtAIdx(index, color);
      });
    } else {
      const color = isDarkPage
        ? 'black'
        : y + height > innerHeight - scrollY
          ? 'black'
          : 'white';

      uiStore.setNavItemColorAtAIdx(index, color);
    }
  }
</script>

<svelte:window
  bind:scrollY
  bind:innerHeight
  on:scroll={setTextColor}
  on:resize={setTextColor} />
<a
  bind:this={anchorEl}
  style="color: {textColor};"
  href={pageUrl ?? externalUrl}
  class="navitem text-[0.84375rem] uppercase leading-[120%] tracking-[0.01688rem] lg:opacity-0">
  <span
    class={cn('origin-center  break-words transition-all duration-500', {
      'font-semibold opacity-100': $page.url.pathname === pageUrl || $page.url.pathname.startsWith(pageUrl + '/') || (pageUrl && $page.url.pathname.includes('/' + pageUrl.replace(/^\//,'') + '/')),
      'font-normal opacity-[0.64] hover:font-semibold hover:opacity-100':
        $page.url.pathname !== pageUrl && !$page.url.pathname.startsWith(pageUrl + '/') && (!pageUrl || !$page.url.pathname.includes('/' + pageUrl.replace(/^\//,'') + '/')),
    })}>
    {title}
  </span>
</a>
