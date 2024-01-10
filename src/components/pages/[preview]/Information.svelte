<script lang="ts">
  import CtaBtn from '@/components/ui/Cta.svelte';
  import type {
    Provenance,
    Information,
  } from '@/lib/types/collection-detail.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import formPopupStore from '@/store/form-popup-store';

  export let name: string;
  export let provenance: Provenance;
  export let information: Information;
  export let hideInquiryButton: boolean | undefined = undefined;

  function inquiryAction() {
    console.log('here');

    formPopupStore.setFormPopupVisibility(true);
  }
</script>

<div
  data-load-animate="y"
  class="flex h-full flex-col max-2xl:gap-y-[2rem] 2xl:flex-row 2xl:divide-x-[0.03125rem] 2xl:divide-[#000]/30 3xl:-mt-[3px]">
  <div
    class="w-full space-y-[1.25rem] 2xl:mr-[1.6875rem] 2xl:w-[40%] 3xl:w-[15.25rem]">
    <h4 class="body-regular !font-inter !font-normal">{name}</h4>

    <ul class="title-light !leading-[142.857%]">
      <li>{information.media}</li>
      <li>{information.size}</li>
      <li>{information.artDate.creationDetails}</li>
      <li>{information.frame}</li>
      {#if !!information?.moreInformation?.length}
        {#each information.moreInformation as info}
          <li>{info}</li>
        {/each}
      {/if}
    </ul>
  </div>

  <div class="flex-1 space-y-[1.25rem] 2xl:pl-[1.6875rem]">
    <h4 class="body-regular !font-inter !font-normal">
      {provenance.title}
    </h4>
    <div class="title-light !leading-[143%] text-dark-gunmetal">
      <PortableText value={provenance.description} />
    </div>
  </div>
</div>

{#if !hideInquiryButton}
  <div class="mt-[2.5rem]" data-load-animate="y">
    <CtaBtn el="button" on:click={() => console.log('clicked')}>Inquire</CtaBtn>
  </div>
{/if}
