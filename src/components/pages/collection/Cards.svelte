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
  {#each items as { name, slug, _id, thumbnail, subtitle, category, displayNew, displaySold } (_id)}
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={`/preview/collection/${slug.current}`}
        class="relative flex flex-col gap-y-[1.25rem]"
        let:Title
        let:Container>
        <div
          class={cn(
            'relative mx-auto h-[25rem] w-full overflow-hidden rounded-[12px]',
            $$props.class,
          )}>
          {#if displayNew || displaySold}
            <CardTag {displayNew} {displaySold} />
          {/if}

          <SanityImage
            imageUrlBuilder={imageBuilder}
            class="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            sizes="(min-width:640px) 35vw, 100vw"
            src={thumbnail}
            alt={thumbnail?.alt} />
        </div>

        <Container class="text-center">
          <Title class="inline">{name} / <span class="head-8">{subtitle}</span></Title>
          <div class="head-8 font-optiberling-agency text-sonic-silver">
            <span>{category?.name ?? ''}</span>
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>
