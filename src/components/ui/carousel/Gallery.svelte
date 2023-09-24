<script lang="ts" generics="T">
  import { chunkArray } from '@/lib/helper';
  import { twMerge } from 'tailwind-merge';
  import breakpoint from '@/store/breakpoint';

  export let items: T[];
  export let slidesPerPage: number | undefined = undefined;

  let innerWidth = 0;
  const BREAKPOINT_TO_SLIDE = {
    sm: 2,
    md: 2,
    lg: 2,
    xl: 3,
    '2xl': 3,
  };

  $: slidesNumber = slidesPerPage ?? BREAKPOINT_TO_SLIDE[$breakpoint];
  $: chunks = chunkArray(items, slidesNumber);
</script>

<svelte:window bind:innerWidth />
{#each chunks as chunk}
  <div class={twMerge('relative flex-[0_0_100%]', $$props.class)}>
    <slot {chunk} />
  </div>
{/each}
