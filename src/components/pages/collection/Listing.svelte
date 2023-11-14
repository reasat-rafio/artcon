<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { FormattedItem } from '@/lib/helper';
  import type { Collection } from '@/lib/types/collection.types';
  import { fade } from 'svelte/transition';

  export let list: FormattedItem<Collection>[];
</script>

<div>
  {#if !!list?.length}
    {#each list as { items, image }}
      <section class="py-section container-primary">
        <div
          class="grid grid-cols-1 gap-x-[25px] gap-y-[56px] md:grid-cols-2 lg:grid-cols-3">
          {#each items as { name, slug, _id, artworkImage, artist, media, year } (_id)}
            <div in:fade out:fade={{ duration: 0 }}>
              <Card
                el="a"
                href={`/collection/${slug.current}`}
                class="flex flex-col gap-y-[20px]"
                let:Image
                let:Title
                let:Container>
                <Image variant="fit" image={artworkImage} />
                <Container class="text-center">
                  <Title>{artist?.name || name}</Title>
                  <div
                    class="font-inter text-[0.8125rem] font-light tracking-[0.01625rem]">
                    <span>{media}</span>
                    <span class="px-2 text-[0.625rem] text-[#77777C]">|</span>
                    <span>{year}</span>
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
