<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Artist } from '@/lib/types/artist.types';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import IntersectionObserver from 'svelte-intersection-observer';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import lightboxStore from '@/store/lightbox';
  import type { SanityImageAssetDocument } from '@sanity/client';

  export let artist: Artist;
  export let title: string;
  export let activeAnchor: string;
  $: ({ name, artistPortrait, customArtworks, slug, tag } = artist);

  let sectionEl: HTMLElement;
  let artistImgEl: HTMLDivElement;
  let intersecting = false;
  $: if (intersecting) activeAnchor = title;

  function openImagePopup(index: number) {
    lightboxStore.setLightboxVisibility(true);
    lightboxStore.setActiveIndex(index);
    lightboxStore.setHideThumbnails(false);
    lightboxStore.setAllImages(
      customArtworks.map((artwork) => artwork.image as SanityImageAssetDocument)
    );
  }

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const artworksEl = sectionEl.querySelectorAll('.artworks');

    gsap.to(artistImgEl, {
      y: 0,
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top center',
        end: 'bottom center',
      },
    });
    gsap.to(artworksEl, {
      y: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top center',
        end: 'bottom center',
      },
    });
  });
</script>

<IntersectionObserver element={sectionEl} bind:intersecting threshold={0.4}>
  <div
    bind:this={sectionEl}
    data-group={title}
    class="grid grid-cols-1 max-md:space-y-[1.25rem] md:grid-cols-2">
    <a
      href="/artist/{slug.current}"
      class="relative mt-[0.75rem] flex flex-col md:pr-[2rem] lg:mt-[3.13rem] 2xl:pr-[5.81rem]">
      <header class="space-y-[0.4375rem] pb-[1.44rem]">
        <h3 class="text-[1.375rem] font-optiberling-agency font-medium">{name}</h3>
        <h4 class="text-[1.125rem] font-optiberling-agency font-medium text-sonic-silver">{tag.name}</h4>
      </header>

      <div class="block md:ml-auto">
        <div
          bind:this={artistImgEl}
          class="relative h-full w-full translate-y-[30px] overflow-hidden rounded-[1.25rem]">
          <SanityImage
            class="aspect-square h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0 hover:scale-105 md:max-h-[23.375rem] md:max-w-[23.375rem]"
            src={artistPortrait}
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt={`${name} Portrait`}
            imageUrlBuilder={imageBuilder} />
        </div>
      </div>
    </a>
    <div class="grid grid-cols-2 max-md:gap-[1.25rem]">
      {#if !!customArtworks?.length}
        {#each customArtworks as artwork, index}
          <button
            type="button"
            on:click={() => openImagePopup(index)}
            on:keydown={(e) => e.key === 'Enter' && openImagePopup(index)}
            class="artworks relative translate-y-[30px] self-start rounded-[0.75rem] cursor-pointer md:pb-[3rem] md:pl-[1.5rem] md:pr-[1.5rem] md:pt-[1.5rem] xl:pb-[3rem] xl:pl-[2.5rem] xl:pr-[2.5rem] xl:pt-[2.5rem] 2xl:pb-[4.09rem] 2xl:pl-[3.37rem] 2xl:pr-[3.39rem] 2xl:pt-[3.35rem]">
            <figure class="overflow-hidden rounded-[0.75rem]">
              <SanityImage
                class="aspect-square h-full w-full rounded-[0.75rem] object-cover transition-transform duration-300 hover:scale-105"
                src={artwork.image}
                sizes="(min-width: 1024px) 15vw, 100vw"
                alt="Artwork by {name}"
                imageUrlBuilder={imageBuilder} />
            </figure>
            {#if artwork.description}
              <div
                class="pl-[0.63rem] pt-[0.63rem] md:absolute md:bottom-[1.34rem] md:left-[1.57rem]">
                <div class="title-regular !font-inter font-normal">
                  <PortableText value={artwork.description} />
                </div>
              </div>
            {/if}
          </button>
        {/each}
      {/if}
    </div>
  </div>
</IntersectionObserver>
