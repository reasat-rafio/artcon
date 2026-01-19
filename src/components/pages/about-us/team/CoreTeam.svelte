<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamProps } from '@/lib/types/about-us.types';

  export let coreTeam: TeamProps[];
</script>

<div
  use:parallaxAnimation
  class="col-span-1 mb-xl grid w-full max-w-full translate-y-[120px] gap-[1rem] md:gap-[2.5rem] lg:grid-cols-2 lg:gap-[2.5rem] xl:grid-cols-3">
  {#each coreTeam as { image, name, role, url }}
    {@const el = url ? 'a' : 'div'}
    <svelte:element this={el} href={url} target={url?.startsWith('http') ? '_blank' : undefined} rel={url?.startsWith('http') ? 'noopener noreferrer' : undefined} class="group relative h-[34.375rem] w-full max-w-full">
      <figure
        class="h-full w-full max-w-full grayscale transition-all duration-500 group-hover:grayscale-0">
        <SanityImage
          class="h-full w-full max-w-full rounded-[1.56rem] object-cover"
          src={image}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imageUrlBuilder={imageBuilder} />
      </figure>

      <div
        class="absolute bottom-0 left-0 w-fit space-y-[0.5rem] pb-[23px] pl-[23px] pr-[30px]">
        <h3
          class="!font-inter !font-normal !leading-snug text-white text-[1.375rem]">
          {name}
        </h3>
        <p class="text-quick-silver text-[1.125rem] font-inter font-light leading-[120%]">{role}</p>
      </div>
    </svelte:element>
  {/each}
</div>
