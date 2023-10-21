<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { FormatedItem } from '@/lib/helper';
  import type { Exhibition } from '@/lib/types/exhibition.types';
  import { fade } from 'svelte/transition';

  export let list: FormatedItem<Exhibition>[];
</script>

<div>
  {#if !!list?.length}
    {#each list as { items, image }}
      <section class="py-section container">
        <div
          class="grid grid-cols-1 gap-x-[25px] gap-y-[56px] md:grid-cols-2 lg:grid-cols-3"
        >
          {#each items as { name, slug, tag, type, previewDisplayImage, _id } (_id)}
            <div in:fade out:fade={{ duration: 0 }}>
              <Card
                el="a"
                href={`/exhibition/${slug.current}`}
                class="flex flex-col gap-y-[20px] pl-[20px]"
                let:Image
                let:Title
                let:Container
                let:Subtitle
              >
                <Image image={previewDisplayImage} />
                <Container>
                  <Title
                    >{name} / {#if typeof type === 'string'}
                      {type}
                    {:else}
                      {type.name}
                    {/if}</Title
                  >
                  <Subtitle class="text-sonic-silver">{tag.name}</Subtitle>
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
      <h3 class="head-3xl">No Exhibition Found</h3>
    </div>
  {/if}
</div>
