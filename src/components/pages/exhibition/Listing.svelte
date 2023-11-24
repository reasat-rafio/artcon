<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { FormattedItem } from '@/lib/helper';
  import type { Exhibition } from '@/lib/types/exhibition.types';
  import { fade } from 'svelte/transition';

  export let list: FormattedItem<Exhibition>[];
</script>

<div>
  {#if !!list?.length}
    {#each list as { items, image }}
      <section
        class="py-section container-primary lg:pr-[2rem] xl:pr-[4.375rem]">
        <div
          class="grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] md:grid-cols-2 xl:grid-cols-3">
          {#each items as { name, slug, tag, type, asset, _id } (_id)}
            <div in:fade out:fade={{ duration: 0 }}>
              <Card
                el="a"
                href={`/exhibition/${slug.current}`}
                class="flex flex-col gap-y-[1.25rem]"
                let:Asset
                let:Title
                let:Container
                let:Subtitle>
                <Asset {asset} />
                <Container>
                  <div>
                    <Title class="inline">{name}</Title>
                    <h6
                      class="inline text-[1rem] font-medium tracking-[0.02rem] text-[#1B1B1E]">
                      /
                      {#if typeof type === 'string'}
                        {type}
                      {:else}
                        {type.name}
                      {/if}
                    </h6>
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
