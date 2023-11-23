<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { FormattedItem } from '@/lib/helper';
  import type { Event } from '@/lib/types/event.types';
  import { fade } from 'svelte/transition';

  export let list: FormattedItem<Event>[];
</script>

<div>
  {#if !!list?.length}
    {#each list as { items, image }}
      <section
        class="py-section container-primary lg:pr-[2rem] xl:pr-[4.375rem]">
        <div
          class="grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] md:grid-cols-2 xl:grid-cols-3">
          {#each items as { name, slug, tag, asset, _id } (_id)}
            <div in:fade out:fade={{ duration: 0 }}>
              <Card
                el="a"
                href={`/event/${slug.current}`}
                class="flex flex-col gap-y-[20px] "
                let:Asset
                let:Title
                let:Container
                let:Subtitle>
                <Asset {asset} />
                <Container>
                  <div>
                    <Title class="inline">{name}</Title>
                  </div>
                  <Subtitle class="font-optiberling-agency text-sonic-silver">
                    {tag.name}
                  </Subtitle>
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
      <h3 class="head-3">No Exhibition Found</h3>
    </div>
  {/if}
</div>
