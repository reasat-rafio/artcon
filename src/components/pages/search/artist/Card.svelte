<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { Artist } from '@/lib/types/artist.types';

  export let artist: Artist;
  $: ({ artistPortrait, customArtworks, name, slug, tag } = artist);
</script>

<div class={cn('grid grid-cols-1 max-md:space-y-[1.25rem] md:grid-cols-2')}>
  <a
    href="/artist/{slug.current}"
    class="relative mt-[0.75rem] flex flex-col md:pr-[2rem] lg:mt-[3.13rem] 2xl:pr-[5.81rem]">
    <header class="space-y-[0.4375rem] pb-[1.44rem]">
      <h3 class="title-regular !font-inter">{name}</h3>
      <h4 class="title-light !font-inter text-sonic-silver">{tag.name}</h4>
    </header>

    <div class="block md:ml-auto">
      <div class="relative h-full w-full overflow-hidden rounded-[1.25rem]">
        <SanityImage
          class="aspect-square h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-110 md:max-h-[23.375rem] md:max-w-[23.375rem]"
          src={artistPortrait}
          sizes="(min-width: 1024px) 40vw, 100vw"
          alt={`${name} Portrait`}
          imageUrlBuilder={imageBuilder} />
      </div>
    </div>
  </a>
  <div class="grid grid-cols-2 max-md:gap-[1.25rem]">
    {#if !!customArtworks?.length}
      {#each customArtworks as artwork}
        <a
          href={`/collection?artist=${slug.current}`}
          class="artworks relative self-start rounded-[0.75rem] md:pb-[3rem] md:pl-[1.5rem] md:pr-[1.5rem] md:pt-[1.5rem] xl:pb-[3rem] xl:pl-[2.5rem] xl:pr-[2.5rem] xl:pt-[2.5rem] 2xl:pb-[4.09rem] 2xl:pl-[3.37rem] 2xl:pr-[3.39rem] 2xl:pt-[3.35rem]">
          <figure class="overflow-hidden rounded-[0.75rem]">
            <SanityImage
              class="aspect-square h-full w-full rounded-[0.75rem] object-cover transition-transform duration-300 hover:scale-110"
              src={artwork.image}
              sizes="(min-width: 1024px) 15vw, 100vw"
              alt={`Artwork by ${name}`}
              imageUrlBuilder={imageBuilder} />
          </figure>
          <div
            class="pl-[0.63rem] pt-[0.63rem] md:absolute md:bottom-[1.34rem] md:left-[1.57rem]">
            <h5 class="title-regular !font-inter font-normal">
              {artwork.title}
            </h5>
          </div>
        </a>
      {/each}
    {/if}
  </div>
</div>
