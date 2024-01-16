<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import type { Publication } from '@/lib/types/publication.types';
  import { cn } from '@/lib/cn';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  export let items: Publication[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3 ',
    $$props.class,
  )}>
  {#each items as { name, slug, _id, prices: { priceBDT, discountPriceBDT }, publicationImage } (_id)}
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={`/preview/publication/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
        let:Image
        let:Title
        let:Container>
        <Image variant="fit" image={publicationImage} />
        <Container class="text-center">
          <Title>{name}</Title>
          <div class="sub-title-regular">
            {#if !!discountPriceBDT}
              <span class="text-sonic-silver line-through">
                {priceBDT}
              </span>
              <span>{discountPriceBDT} BDT</span>
            {:else}
              <span>{priceBDT} BDT</span>
            {/if}
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>
