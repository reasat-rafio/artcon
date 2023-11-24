<script lang="ts">
  import BodyText from '@/components/ui/BodyText.svelte';
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
          class="h-full w-full rounded-lg object-cover"
          src={image}
          alt={name}
          sizes="20vw"
          imageUrlBuilder={imageBuilder} />
      </figure>

      <div
        class="absolute bottom-0 left-0 w-fit space-y-[0.5rem] pb-[23px] pl-[23px] pr-[30px]">
        <h6 class="body-regular text-white">{name}</h6>
        <p class="title-light text-[#A5A5A8]">{role}</p>
      </div>
    </svelte:element>
  {/each}
</div>
