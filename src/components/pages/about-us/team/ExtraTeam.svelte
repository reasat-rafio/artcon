<script lang="ts">
  import H4 from '@/components/ui/H4.svelte';
  import H8 from '@/components/ui/H8.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamProps } from '@/lib/types/aboutUs.types';

  export let extraTeam: TeamProps[];
</script>

<div>
  <H4 class="mb-md">Other team mambers</H4>
  <div class="grid grid-cols-3 gap-[22px]">
    {#each extraTeam as { image, name, role, url }}
      {@const el = url ? 'a' : 'div'}
      <svelte:element
        this={el}
        href={url}
        class="group flex items-center justify-center space-x-[20px]"
      >
        <figure class="h-[112px] w-[112px]">
          <SanityImage
            class="h-full w-full rounded-full object-cover"
            src={image}
            alt={name}
            sizes="120px"
            imageUrlBuilder={imageBuilder}
          />
        </figure>
        <div class="flex-1 space-y-[7px]">
          <H8>{name}</H8>
          <H8 el="p" class="text-[#77777C]">{role}</H8>
        </div>
      </svelte:element>
    {/each}
  </div>
</div>
