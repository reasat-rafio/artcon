<script lang="ts">
  import { fade } from 'svelte/transition';
  import Card from '@/components/ui/card/Card.svelte';
  import type { Publication } from '@/lib/types/publication.types';

  export let items: Publication[];
</script>

<div
  class="grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] md:grid-cols-2 xl:grid-cols-3">
  {#each items as { name, slug, _id, prices: { priceBDT, priceUSD, discountPriceBDT }, publicationImage } (_id)}
    <div in:fade out:fade={{ duration: 0 }}>
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
              <span class="text-[#77777C] line-through">
                {priceBDT}
              </span>
              <span>{discountPriceBDT} BDT</span>
            {:else}
              <span>{priceBDT} BDT</span>
            {/if}
            <span>/</span>
            <span>{priceUSD} USD</span>
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>
