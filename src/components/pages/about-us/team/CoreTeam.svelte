<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamProps } from '@/lib/types/about-us.types';

  export let coreTeam: TeamProps[];
</script>

<div
  class="col-span-1 mb-xl grid gap-[1rem] md:gap-[2.5rem] lg:grid-cols-2 lg:gap-[3.56rem] xl:grid-cols-3">
  {#each coreTeam as { image, name, role, url }}
    {@const el = url ? 'a' : 'div'}
    <svelte:element this={el} href={url} class="group relative h-[34.375rem]">
      <figure
        class="h-full w-full grayscale transition-all duration-500 group-hover:grayscale-0">
        <SanityImage
          class="h-full w-full rounded-[1.56rem] object-cover"
          src={image}
          alt={name}
          sizes="20vw"
          imageUrlBuilder={imageBuilder} />
      </figure>

      <div
        class="absolute bottom-0 left-0 w-fit space-y-[0.5rem] pb-[23px] pl-[23px] pr-[30px]">
        <h3
          class="body-regular !font-inter !font-normal !leading-snug text-white">
          {name}
        </h3>
        <p class="title-light text-quick-silver">{role}</p>
      </div>
    </svelte:element>
  {/each}
</div>
