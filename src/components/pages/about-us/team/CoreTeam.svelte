<script lang="ts">
  import BodyText from '@/components/ui/BodyText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamProps } from '@/lib/types/aboutUs.types';

  export let coreTeam: TeamProps[];
</script>

<div
  class="col-span-1 mb-lg grid gap-[1rem] md:gap-[2.5rem] lg:grid-cols-2 lg:gap-[3.56rem] xl:grid-cols-3"
>
  {#each coreTeam as { image, name, role, url }}
    {@const el = url ? 'a' : 'div'}
    <svelte:element this={el} href={url} class="group relative h-[550px]">
      <figure
        class="h-full w-full grayscale transition-all duration-500 group-hover:grayscale-0"
      >
        <SanityImage
          class="h-full w-full rounded-lg object-cover"
          src={image}
          alt={name}
          sizes="20vw"
          imageUrlBuilder={imageBuilder}
        />
      </figure>

      <div class="absolute bottom-0 left-0 w-fit p-[23px]">
        <h6 class="text-body-1 text-white">{name}</h6>
        <p class="text-title-2 text-[#A5A5A8]">{role}</p>
      </div>
    </svelte:element>
  {/each}
</div>
