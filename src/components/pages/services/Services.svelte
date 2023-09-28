<script lang="ts">
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ServiceProps } from '@/lib/types/services.types';
  import { PortableText } from '@portabletext/svelte';

  export let services: ServiceProps[];
</script>

<section class="pt-sm md:pt-md lg:pt-lg xl:pt-xl">
  <div class="container">
    {#each services as { title, description, image, cta }}
      <article class="mb-sm md:mb-md lg:mb-lg xl:mb-xl">
        <DescriptionBlock class="mb-sm md:mb-md lg:mb-lg xl:mb-xl">
          <svelte:fragment slot="intro" let:C>
            <C.Title>{title}</C.Title>
          </svelte:fragment>
          <svelte:fragment slot="description" let:Description>
            <Description>
              <PortableText value={description} />
            </Description>
            {#if !!cta?.title}
              <Cta class="mt-md" href={cta.href}>{cta.title}</Cta>
            {/if}
          </svelte:fragment>
        </DescriptionBlock>

        <figure>
          <SanityImage
            class="aspect-video h-full w-full rounded-[25px] object-cover"
            src={image}
            alt={image.alt}
            imageUrlBuilder={imageBuilder}
            sizes="70vw"
          />
        </figure>
      </article>
    {/each}
  </div>
</section>
