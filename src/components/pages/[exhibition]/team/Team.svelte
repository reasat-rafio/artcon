<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamProps } from '@/lib/types/exhibition-detail.types';

  export let props: TeamProps;
  let { title, members } = props;
</script>

<section use:parallaxAnimation class="translate-y-[120px]">
  <h3 class="head-4 mb-md">{title}</h3>

  <div
    class="grid grid-cols-1 gap-x-[3.56rem] gap-y-[3.12rem] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
    {#each members as { image, name, role }}
      <div class="group flex h-fit items-center justify-center gap-x-[1.25rem]">
        <figure class="h-[7rem] w-[7rem] rounded-full overflow-hidden">
          <SanityImage
            class="h-full w-full rounded-full object-cover transition-transform duration-300 hover:scale-110"
            src={image}
            alt={name}
            sizes="120px"
            imageUrlBuilder={imageBuilder} />
        </figure>
        <div class="flex-1 space-y-[0.438rem]">
          <h4 class="haed-6">{name}</h4>
          <p class="head-8 font-optiberling-agency text-sonic-silver">
            {role}
          </p>
        </div>
      </div>
    {/each}
  </div>
</section>
