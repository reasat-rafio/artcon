<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import type { Collection } from '@/lib/types/collection.types';
  import { fade } from 'svelte/transition';
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import CardTag from './CardTag.svelte';
  import { flip } from 'svelte/animate';

  export let items: Collection[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, _id, artworkImage, artist, media, year, displayNew, displaySold } (_id)}
    <div animate:flip={{ duration: 500 }}>
      <Card
        el="a"
        href={`/collection/${slug.current}`}
        class="relative flex flex-col gap-y-[1.25rem]"
        let:Title
        let:Container>
        <div
          class={cn(
            'relative mx-auto h-auto w-fit sm:h-[25rem]',
            $$props.class,
          )}>
          {#if displayNew || displaySold}
            <CardTag {displayNew} {displaySold} />
          {/if}

          <SanityImage
            imageUrlBuilder={imageBuilder}
            class="h-full w-full object-contain object-bottom"
            sizes="(min-width:640px) 35vw, 100vw"
            src={artworkImage}
            alt={artworkImage?.alt} />
        </div>

        <Container class="text-center">
          <Title>{artist?.name || name}</Title>
          <div
            class="font-inter text-[0.8125rem] font-light tracking-[0.01625rem]">
            <span>{media}</span>
            <span class="px-2 text-[0.625rem] text-sonic-silver">|</span>
            <span>{year}</span>
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>
