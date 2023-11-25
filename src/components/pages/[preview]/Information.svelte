<script lang="ts">
  import CtaBtn from '@/components/ui/Cta.svelte';
  import type {
    Provenance,
    Information,
  } from '@/lib/types/collection-detail.types';
  import type { Cta } from '@/lib/types/common.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';

  export let name: string;
  export let provenance: Provenance;
  export let information: Information;
  export let inquiryButton: Cta;
</script>

<div
  data-load-animate="y"
  class="flex h-full flex-col max-2xl:gap-y-[2rem] 2xl:flex-row 2xl:divide-x-[0.03125rem] 2xl:divide-[#A5A5A8]">
  <div
    class="w-full space-y-[1.25rem] 2xl:mr-[1.6875rem] 2xl:w-[40%] 3xl:w-[15.25rem]">
    <h4 class="body-regular !font-normal">{name}</h4>

    <ul class="title-light !leading-[142.857%]">
      <li>{information.media} (media)</li>
      <li>{information.size} (size)</li>
      <li>{information.artDate.creationDetails} (art date)</li>
      <li>{information.frame} (frame)</li>
      {#if !!information?.moreInformation?.length}
        {#each information.moreInformation as info}
          <li>{info}</li>
        {/each}
      {/if}
    </ul>
  </div>

  <div class="flex-1 space-y-[1.25rem] 2xl:pl-[1.6875rem]">
    <h4 class="body-regular !font-normal">
      {provenance.title}
    </h4>
    <div class="title-light !leading-[143%]">
      <PortableText value={provenance.description} />
    </div>
  </div>
</div>

{#if !!inquiryButton?.title}
  <div class="mt-[2rem]" data-load-animate="y">
    <CtaBtn href={inquiryButton.href}>
      {inquiryButton.title}
    </CtaBtn>
  </div>
{/if}
