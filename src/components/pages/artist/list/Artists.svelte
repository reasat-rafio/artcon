<script lang="ts">
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SortedArtists } from '@/lib/types/artist.types';

  export let artistGroup: SortedArtists[];
</script>

<div class={cn($$props.class)}>
  {#each artistGroup as { title, artists }}
    <section>
      <h2
        class="font-outfit mb-[3.31rem] text-[1.50363rem] font-medium tracking-[-0.03006rem] text-[#ED1C24]">
        {title}
      </h2>

      <div class="space-y-[2.5rem]">
        {#each artists as { name, artistPortrait, artworks, slug, tag }}
          <div class="grid grid-cols-2">
            <a
              href="/artist/{slug.current}"
              class="relative mt-[3.13rem] flex flex-col pr-[5.81rem]">
              <header class="space-y-[0.4375rem] pb-[1.44rem]">
                <h3 class="title-regular">{name}</h3>
                <h4 class="title-light text-[#77777C]">{tag.name}</h4>
              </header>

              <figure class="ml-auto block">
                <SanityImage
                  class="aspect-square h-full max-h-[23.375rem] w-full max-w-[23.375rem] rounded-[1.25rem] object-cover"
                  src={artistPortrait}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={`${name} Portrait`}
                  imageUrlBuilder={imageBuilder} />
              </figure>
            </a>
            <div class="grid grid-cols-2">
              {#if !!artworks?.length}
                {#each artworks as { artworkImage, name, slug }}
                  <a
                    href={`/collection/${slug.current}`}
                    class="relative self-start rounded-[0.75rem] pb-[4.09rem] pl-[3.37rem] pr-[3.39rem] pt-[3.35rem]">
                    <figure>
                      <SanityImage
                        class="aspect-square h-full w-full rounded-[0.75rem] object-cover"
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
        {/each}
      </div>
    </section>
  {/each}
</div>
