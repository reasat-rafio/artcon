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
      <section
        class="py-section container-primary lg:pr-[2rem] xl:pr-[4.375rem]">
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
      </section>

      {#if !!image}
        <ImageAsset props={image} />
      {/if}
    {/each}
  {:else}
    <div class="py-section container">
      <h3 class="head-3">No Virtual Reality Found</h3>
    </div>
  {/if}
</div>
