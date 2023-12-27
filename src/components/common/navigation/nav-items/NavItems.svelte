<script lang="ts">
  import type { NavProps } from '@/lib/types/common.types';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Item from './Item.svelte';

  export let nav: NavProps;
  let { menu } = nav;

  let innerHeight = 0;

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

<svelte:window bind:innerHeight />
<aside
  class="!fixed left-0 top-1/2 z-[1004] hidden h-full w-[11rem] -translate-y-1/2 items-center lg:flex 2xl:w-[16rem]">
  <nav class="ml-[2.5rem] flex flex-col gap-y-[1.25rem]">
    {#each menu as { title, externalUrl, pageUrl }}
      <Item {title} {pageUrl} {externalUrl} />
    {/each}
  </nav>
</aside>
