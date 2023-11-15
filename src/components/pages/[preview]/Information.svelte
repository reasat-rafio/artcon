<script lang="ts">
  import CtaBtn from '@/components/ui/Cta.svelte';
  import type {
    Provenance,
    Information,
  } from '@/lib/types/collection-detail.types';
  import type { Cta } from '@/lib/types/common.types';
  import { PortableText } from '@portabletext/svelte';

  export let name: string;
  export let provenance: Provenance;
  export let information: Information;
  export let inquiryButton: Cta;
</script>

<div
  data-load-animate="y"
  class="grid grid-cols-12 max-sm:gap-y-[2rem] sm:divide-x-[0.5px] sm:divide-[#A5A5A8]">
  <div
    class="col-span-12 space-y-[1.25rem] sm:col-span-6 sm:pr-[1.69rem] xl:col-span-4">
    <h4 class="body-2 font-inter !font-normal">{name}</h4>

    <ul class="title-light !leading-[143%]">
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
  <div
    class="col-span-12 space-y-[1.25rem] sm:col-span-6 sm:pl-[1.69rem] xl:col-span-8">
    <h4 class="body-light-m md:body-regular !font-normal">
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
