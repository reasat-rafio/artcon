<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import Youtube from '@/components/common/Youtube.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { Association } from '@/lib/types/common.types';
  import type { SummaryProps } from '@/lib/types/event-detail.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';

  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import type { PortableTextBlock } from 'sanity';

  type Props = SummaryProps & {
    descriptionBlock: {
      gallery: { name: string };
      date: string;
      associationsList: Association[];
      description: PortableTextBlock[];
    };
  };

  export let props: Props;
  $: ({ quote, vrOrYtVideoSlider, descriptionBlock } = props);

  let emblaApi: EmblaCarouselType;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<section>
  <div class="py-section container-primary">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[20px] lg:mb-[40px] xl:mb-[50px]">
          <C.Title>{descriptionBlock.gallery.name}</C.Title>
          <C.Subtitle>{descriptionBlock.date}</C.Subtitle>
        </C.HeaderContainer>
        <div class="space-y-[10px] lg:space-y-[13px]">
          {#each descriptionBlock.associationsList as { key, value }}
            <div>
              <C.Subtitle el="h4" variant="sm" class="text-sonic-silver">
                {key}
              </C.Subtitle>
              <C.Subtitle el="div" variant="sm">{value}</C.Subtitle>
            </div>
          {/each}
        </div>
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={descriptionBlock.description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>

    {#if !!vrOrYtVideoSlider?.length}
      <div
        class="relative overflow-hidden"
        use:emblaCarouselSvelte={{ plugins: [], options: {} }}
        on:emblaInit={onInit}>
        <div class="flex">
          {#each vrOrYtVideoSlider as props}
            <div class="flex-[0_0_100%]">
              {#if props._type === 'vr'}
                <VR vr={props} />
              {:else if props._type === 'youtube'}
                <Youtube yt={props} />
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    <div class="flex justify-end">
      <nav class="space-x-[0.62rem]">
        <button on:click={() => emblaApi.scrollPrev()}>
          <ChevronLeftRounded />
        </button>
        <button on:click={() => emblaApi.scrollNext()}>
          <ChevronRightRounded />
        </button>
      </nav>
    </div>
  </div>
</section>
