<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import Youtube from '@/components/common/Youtube.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { Association, SocialProps, VR as VRType, Youtube as YoutubeType, Cta } from '@/lib/types/common.types';
  import type { SummaryProps } from '@/lib/types/event-detail.types';
  import type { PortableTextBlock } from 'sanity';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { EmblaCarouselType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import { onDestroy } from 'svelte';

  type Props = SummaryProps & {
    descriptionBlock: {
      gallery: { name: string; location?: string; url?: string };
      date: string;
      associationsList?: Association[];
      associationsButton?: Cta;
      socials?: SocialProps[];
      description?: PortableTextBlock[];
    };
    vrOrYtVideoSlider?: Array<VRType | YoutubeType>;
  };

  export let props: Props;
  $: ({ quote, descriptionBlock, vrOrYtVideoSlider } = props);

  let emblaApi: EmblaCarouselType;
  let autoplayInstance: any;
  let hasStartedMoving = false;
  
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    autoplayInstance = emblaApi.plugins()?.autoplay;
    
    emblaApi.on('select', () => {
      const currentIndex = emblaApi.selectedScrollSnap();
      
      if (currentIndex !== 0 && !hasStartedMoving) {
        hasStartedMoving = true;
      }
      
      if (currentIndex === 0 && hasStartedMoving) {
        autoplayInstance?.stop();
      }
    });
  };

  $: carouselOptions = {
    watchDrag: false,
    loop: vrOrYtVideoSlider && vrOrYtVideoSlider.length > 1,
    plugins: vrOrYtVideoSlider && vrOrYtVideoSlider.length > 1 
      ? [Autoplay({ delay: 4000, stopOnInteraction: false, jump: false })]
      : []
  };

  onDestroy(() => {
    autoplayInstance?.stop();
  });
</script>

<section>
  <div class="pt-sm container-primary md:pt-[5rem] xl:pt-section {$$props.class}">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[1.875rem]">
          {@const galleryUrl = descriptionBlock.gallery.url || (descriptionBlock.gallery.location?.startsWith('http') ? descriptionBlock.gallery.location : null)}
          {#if galleryUrl}
            <a href={galleryUrl} target="_blank" rel="noopener noreferrer" class="cursor-pointer transition-colors">
              <C.Title class="!leading-none !mb-0 hover:!text-gray-500">{descriptionBlock.gallery.name}</C.Title>
            </a>
          {:else}
            <C.Title class="!leading-none !mb-0">{descriptionBlock.gallery.name}</C.Title>
          {/if}
          {#if descriptionBlock.gallery.location && !descriptionBlock.gallery.location.startsWith('http')}
            <C.Subtitle class="!leading-none !mt-0 !mb-0">{descriptionBlock.gallery.location}</C.Subtitle>
          {/if}
          <C.Subtitle class="!mt-[10px] !leading-none !mb-0">{descriptionBlock.date}</C.Subtitle>
        </C.HeaderContainer>
        {#if !!descriptionBlock.associationsList?.length}
          <div class="mb-[1.875rem] space-y-[10px] lg:space-y-[13px]">
            {#each descriptionBlock.associationsList as { key, value, url, logo }}
              <div>
                {#if logo}
                  <div class="mb-2 flex">
                    <div class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src={imageBuilder.image(logo).width(100).height(100).url()}
                        alt={key} 
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                {/if}
                <C.Subtitle
                  el="h4"
                  variant="sm"
                  class="!text-[0.875rem] text-sonic-silver">
                  {key}
                </C.Subtitle>
                {#if url}
                  <a href={url} target="_blank" rel="noopener noreferrer" class="cursor-pointer hover:underline">
                    <C.Subtitle el="div" variant="sm">{value}</C.Subtitle>
                  </a>
                {:else}
                  <C.Subtitle el="div" variant="sm">{value}</C.Subtitle>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
        {#if descriptionBlock.associationsButton}
          <a
            href={descriptionBlock.associationsButton.href}
            target="{descriptionBlock.associationsButton.href.startsWith('http') ? '_blank' : '_self'}"
            rel="{descriptionBlock.associationsButton.href.startsWith('http') ? 'noopener noreferrer' : ''}"
            class="mt-[1.875rem] inline-block rounded-full border border-black bg-transparent px-[30px] py-[10px] text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-black hover:text-black lg:px-[40px] lg:py-[12px] lg:text-base">
            {descriptionBlock.associationsButton.title}
          </a>
        {/if}
        {#if !!descriptionBlock.socials?.length}
          <C.SocialContainer class="mt-[1.875rem]">
            {#each descriptionBlock.socials as { link, type }}
              <C.Social {link} {type} />
            {/each}
          </C.SocialContainer>
        {/if}
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        {#if !!descriptionBlock.description?.length}
          <Description>
            <PortableText value={descriptionBlock.description} />
          </Description>
        {/if}
      </svelte:fragment>
    </DescriptionBlock>

    {#if !!vrOrYtVideoSlider?.length}
      <div class="mt-section">
        <div
          class="relative overflow-hidden"
          use:emblaCarouselSvelte={{ plugins: carouselOptions.plugins, options: carouselOptions }}
          on:emblaInit={onInit}>
          <div class="-ml-[1.25rem] flex">
            {#each vrOrYtVideoSlider as video}
              <div class="flex-[0_0_100%] pl-[1.25rem]">
                {#if video._type === 'vr'}
                  <VR vr={video} />
                {:else if video._type === 'youtube'}
                  <Youtube yt={video} />
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <div
          class="mx-auto flex max-w-[72.9375rem] -translate-y-[0.875rem] justify-center md:justify-end mt-[2rem] md:mt-0">
          <nav class="flex gap-x-[0.62rem]">
            <button
              aria-label="Scroll to previous slide"
              on:click={() => emblaApi.scrollPrev()}>
              <ChevronLeftRounded />
            </button>
            <button
              aria-label="Scroll to next slide"
              on:click={() => emblaApi.scrollNext()}>
              <ChevronRightRounded />
            </button>
          </nav>
        </div>
      </div>
    {/if}
  </div>
</section>
