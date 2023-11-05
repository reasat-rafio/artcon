<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { FormattedItem } from '@/lib/helper';
  import type { Publication } from '@/lib/types/publication.types';
  import { fade } from 'svelte/transition';

  export let list: FormattedItem<Publication>[];
</script>

<div>
  {#if !!list?.length}
    {#each list as { items, image }}
      <section class="py-section container-primary">
        <div
          class="grid grid-cols-1 gap-x-[25px] gap-y-[56px] md:grid-cols-2 lg:grid-cols-3"
        >
          {#each items as { name, slug, _id, prices: { priceBDT, priceUSD, discountPriceBDT }, publicationImage } (_id)}
            <div in:fade out:fade={{ duration: 0 }}>
              <Card
                el="a"
                href={`/preview/publication/${slug.current}`}
                class="flex flex-col gap-y-[20px]"
                let:Image
                let:Title
                let:Container
              >
                <Image variant="fit" image={publicationImage} />
                <Container class="text-center">
                  <Title>{name}</Title>
                  <div
                    class="font-inter text-[0.8125rem] font-normal uppercase tracking-[0.01625rem] text-[#1D1D25]"
                  >
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
      </section>

      {#if !!image}
        <ImageAsset props={image} />
      {/if}
    {/each}
  {:else}
    <div class="py-section container">
      <h3 class="head-3xl">No Virtual Reality Found</h3>
    </div>
  {/if}
</div>
