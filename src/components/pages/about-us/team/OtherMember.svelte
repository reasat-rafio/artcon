<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamProps } from '@/lib/types/about-us.types';

  export let extraTeam: TeamProps[];
</script>

<section use:parallaxAnimation class="w-full max-w-full translate-y-[120px]">
  <h3 class="head-4 mb-md">Other team members</h3>

  <div
    class="grid w-full max-w-full grid-cols-1 gap-x-[1.5rem] gap-y-[2rem] sm:grid-cols-2 md:grid-cols-2 md:gap-x-[2.5rem] md:gap-y-[3.12rem] lg:grid-cols-3 lg:gap-x-[3.56rem]">
    {#each extraTeam as { image, name, type, role, url }}
      <svelte:element
        this={url ? 'a' : 'div'}
        href={url}
        target={url?.startsWith('http') ? '_blank' : undefined}
        rel={url?.startsWith('http') ? 'noopener noreferrer' : undefined}
        class="group flex h-fit w-full max-w-full items-center justify-start gap-x-[1.25rem]">
        <figure class="h-[7rem] w-[7rem] flex-shrink-0 overflow-hidden rounded-full">
          <SanityImage
            class="h-full w-full rounded-full object-cover transition-transform duration-300 hover:scale-110"
            src={image}
            alt={name}
            sizes="120px"
            imageUrlBuilder={imageBuilder} />
        </figure>
        <div class="flex-1 space-y-[0.438rem]">
          <h4 class="text-[1.375rem] font-medium leading-[128.5%] tracking-[0.04rem]">{name}</h4>
          <p class="text-[1.125rem] font-optiberling-agency text-sonic-silver font-medium tracking-[0.02rem]">
            {role}
          </p>
        </div>
      </svelte:element>
    {/each}
  </div>
</section>
