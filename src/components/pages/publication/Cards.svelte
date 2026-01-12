<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import type { Publication } from '@/lib/types/publication.types';
  import { cn } from '@/lib/cn';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  export let items: Publication[];
  
  let hoveredId: string | null = null;
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3 ',
    $$props.class,
  )}>
  {#each items as { name, subtitle, slug, _id, category, prices: { priceBDT, discountPriceBDT }, thumbnail, publicationImage } (_id)}
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={`/preview/publication/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem] overflow-hidden"
        let:Image
        let:Title
        let:Container
        let:Subtitle
        on:mouseenter={() => (hoveredId = _id)}
        on:mouseleave={() => (hoveredId = null)}>
        <Image variant="fit" image={thumbnail || publicationImage} class="!rounded-none w-full" />
        <Container class="flex flex-col gap-y-1">
          <Title 
            class="text-left truncate" 
            title={`${name} / ${subtitle}`}
          >
            {name} / <span class="head-8">{subtitle}</span>
          </Title>
          <div class="flex items-center justify-between">
            <div class="font-inter text-sonic-silver text-[14px] font-[300]">
              {category?.name || 'Book'}
            </div>
            <div class="flex items-center gap-x-1 font-inter text-[14px]">
              {#if !!discountPriceBDT}
                <span class="text-sonic-silver line-through text-[14px] font-[300]">
                  {priceBDT}
                </span>
                <span class="font-[500]">{discountPriceBDT} BDT</span>
              {:else}
                <span class="font-[500]">{priceBDT} BDT</span>
              {/if}
            </div>
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>
