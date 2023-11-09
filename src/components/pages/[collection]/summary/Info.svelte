<script lang="ts">
  import CtaBtn from '@/components/ui/Cta.svelte';
  import type { Information } from '@/lib/types/collection-detail.types';
  import type { Cta } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';

  export let artworkName: string;
  export let inquiryButton: Cta;
  export let information: Information;
  $: ({ artDate, frame, media, size, moreInformation } = information);
</script>

<div class={twMerge('space-y-[1.25rem]', $$props.class)}>
  <h4 class="body-2 font-inter">{artworkName}</h4>

  <ul class="text-[0.875rem] font-light leading-[1.25rem]">
    <li>{media} (media)</li>
    <li>{size} (size)</li>
    <li>{artDate.creationDetails} (art date)</li>
    <li>{frame} (frame)</li>
    {#if !!moreInformation?.length}
      {#each moreInformation as info}
        <li>{info}</li>
      {/each}
    {/if}
  </ul>
</div>
<!-- TODO fix the color and variant -->
{#if !!inquiryButton?.title}
  <div class={twMerge('relative', $$props.class)}>
    <CtaBtn href={inquiryButton.href}>
      {inquiryButton.title}
    </CtaBtn>
  </div>
{/if}
