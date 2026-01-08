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
  {#each items as { name, subtitle, slug, _id, prices: { priceBDT, discountPriceBDT }, publicationImage } (_id)}
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
        <Image variant="fit" image={publicationImage} class="!rounded-none" />
        <Container class="flex flex-col items-center text-center gap-y-1">
          <div>
            <Title class="inline">{name} / <span class="head-8">{subtitle}</span></Title>
          </div>
          <Subtitle class="font-inter text-sonic-silver">
            Book
          </Subtitle>
          <span class="font-inter text-sonic-silver">
            {#if !!discountPriceBDT}
              <span class="text-sonic-silver line-through">
                {priceBDT}
              </span>
              <span>{discountPriceBDT} BDT</span>
            {:else}
              <span>{priceBDT} BDT</span>
            {/if}
          </span>
        </Container>
      </Card>
    </div>
  {/each}
</div>
