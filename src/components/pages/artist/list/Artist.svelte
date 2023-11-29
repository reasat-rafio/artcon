<script lang="ts">
  import type { Artist } from '@/lib/types/artist.types';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import IntersectionObserver from 'svelte-intersection-observer';

  export let artist: Artist;
  export let title: string;
  export let activeAnchor: string;
  $: ({ name, artistPortrait, artworks, slug, tag } = artist);

  let sectionEl: HTMLElement;
  let intersecting = false;

  $: if (intersecting) activeAnchor = title;
</script>

<IntersectionObserver element={sectionEl} bind:intersecting threshold={0.4}>
  <div bind:this={sectionEl} data-group={title} class="grid grid-cols-2">
    <a
      href="/artist/{slug.current}"
      class="relative mt-[3.13rem] flex flex-col pr-[5.81rem]">
      <header class="space-y-[0.4375rem] pb-[1.44rem]">
        <h3 class="title-regular">{name}</h3>
        <h4 class="title-light text-[#77777C]">{tag.name}</h4>
      </header>

      <div class="ml-auto block">
        <div class="relative h-full w-full overflow-hidden rounded-[1.25rem]">
          <SanityImage
            class="aspect-square h-full max-h-[23.375rem] w-full max-w-[23.375rem] object-cover grayscale transition-all duration-500 hover:grayscale-0"
            src={artistPortrait}
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt={`${name} Portrait`}
            imageUrlBuilder={imageBuilder} />
        </div>
      </div>
    </a>
    <div class="grid grid-cols-2">
      {#if !!artworks?.length}
        {#each artworks as { artworkImage, name, slug }}
          <a
            href={`/collection/${slug.current}`}
            class="relative self-start rounded-[0.75rem] pb-[4.09rem] pl-[3.37rem] pr-[3.39rem] pt-[3.35rem]">
            <figure>
              <SanityImage
                class="aspect-square h-full w-full rounded-[0.75rem] object-cover transition-all duration-500 hover:scale-110 hover:shadow-2xl"
                src={artworkImage}
                sizes="(min-width: 1024px) 15vw, 100vw"
                alt={name}
                imageUrlBuilder={imageBuilder} />
            </figure>
            <div class="absolute bottom-[1.34rem] left-[1.57rem]">
              <h5 class="title-regular font-inter font-normal">
                {name}
              </h5>
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>
</IntersectionObserver>
