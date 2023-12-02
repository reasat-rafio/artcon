<script lang="ts">
  import CtaBtn from '@/components/ui/Cta.svelte';
  import { cn } from '@/lib/cn';
  import type { Information } from '@/lib/types/collection-detail.types';
  import type { Cta } from '@/lib/types/common.types';

  export let artworkName: string;
  export let inquiryButton: Cta;
  export let information: Information;
  $: ({ artDate, frame, media, size, moreInformation } = information);
</script>

<div class={cn('space-y-[1.25rem]', $$props.class)}>
  <h4 class="body-regular font-inter font-normal">{artworkName}</h4>

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

{#if !!inquiryButton?.title}
  <div class={cn('relative z-10', $$props.class)}>
    <CtaBtn variant="tertiary" href={inquiryButton.href}>
      {inquiryButton.title}
    </CtaBtn>
  </div>
{/if}
