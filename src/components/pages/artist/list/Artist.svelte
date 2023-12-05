<script lang="ts">
  import type { Artist } from '@/lib/types/artist.types';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import IntersectionObserver from 'svelte-intersection-observer';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  export let artist: Artist;
  export let title: string;
  export let activeAnchor: string;
  $: ({ name, artistPortrait, artworks, slug, tag } = artist);

  let sectionEl: HTMLElement;
  let artistImgEl: HTMLDivElement;
  let intersecting = false;

  $: if (intersecting) activeAnchor = title;

  onMount(() => {
    const artworksEl = sectionEl.querySelectorAll('.artworks');

    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top bottom-=100px',
        end: 'bottom 90%',
      },
    });
    tl.to(artistImgEl, { y: 0, ease: 'ease.out' }, 0).to(
      artworksEl,
      { y: 0, ease: 'ease.out', stagger: 0.1 },
      0.3,
    );
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
        <h3 class="title-regular !font-inter">{name}</h3>
        <h4 class="title-light !font-inter text-[#77777C]">{tag.name}</h4>
      </header>

      <div class="block md:ml-auto">
        <div
          bind:this={artistImgEl}
          class="relative h-full w-full translate-y-[60px] overflow-hidden rounded-[1.25rem]">
          <SanityImage
            class="aspect-square h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0 md:max-h-[23.375rem] md:max-w-[23.375rem]"
            src={artistPortrait}
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt={`${name} Portrait`}
            imageUrlBuilder={imageBuilder} />
        </div>
      </div>
    </a>
    <div class="grid grid-cols-2 max-md:gap-[1.25rem]">
      {#if !!artworks?.length}
        {#each artworks as { artworkImage, name, slug }}
          <a
            href={`/collection/${slug.current}`}
            class="artworks relative translate-y-[30px] self-start rounded-[0.75rem] md:pb-[3rem] md:pl-[1.5rem] md:pr-[1.5rem] md:pt-[1.5rem] xl:pb-[3rem] xl:pl-[2.5rem] xl:pr-[2.5rem] xl:pt-[2.5rem] 2xl:pb-[4.09rem] 2xl:pl-[3.37rem] 2xl:pr-[3.39rem] 2xl:pt-[3.35rem]">
            <figure>
              <SanityImage
                class="aspect-square h-full w-full rounded-[0.75rem] object-cover transition-all duration-500 hover:scale-110 hover:shadow-2xl"
                src={artworkImage}
                sizes="(min-width: 1024px) 15vw, 100vw"
                alt={name}
                imageUrlBuilder={imageBuilder} />
            </figure>
            <div
              class="pl-[0.63rem] pt-[0.63rem] md:absolute md:bottom-[1.34rem] md:left-[1.57rem]">
              <h5 class="title-regular !font-inter font-normal">
                {name}
              </h5>
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>
</IntersectionObserver>
