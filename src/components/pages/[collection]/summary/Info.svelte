<script lang="ts">
  import CtaBtn from '@/components/ui/Cta.svelte';
  import { cn } from '@/lib/cn';
  import type { Information } from '@/lib/types/collection-detail.types';
  import formPopupStore from '@/store/form-popup-store';

  export let artworkName: string;
  export let hideInquiryButton: boolean = false;
  export let information: Information;
  $: ({ artDate, frame, media, size, moreInformation } = information);
</script>

<div class={cn('space-y-[1.25rem]', $$props.class)}>
  <h4 class="body-regular !font-inter !font-normal">{artworkName}</h4>

  <ul class="text-[0.875rem] font-light leading-[1.25rem]">
    <li>{media}</li>
    <li>{size}</li>
    <li>{artDate.creationDetails}</li>
    <li>{frame}</li>
    {#if !!moreInformation?.length}
      {#each moreInformation as info}
        <li>{info}</li>
      {/each}
    {/if}
  </ul>
</div>

{#if !hideInquiryButton}
  <div class={cn('relative z-10', $$props.class)}>
    <CtaBtn
      el="button"
      variant="tertiary"
      onClick={() => formPopupStore.setFormPopupVisibility(true)}>
      Inquiry
    </CtaBtn>
  </div>
{/if}
