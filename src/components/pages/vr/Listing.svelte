<script lang="ts">
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { FormattedItem } from '@/lib/helper';
  import type { Vr } from '@/lib/types/vr.types';
  import { fade } from 'svelte/transition';

  export let list: FormattedItem<Vr>[];
</script>

<div>
  {#if !!list?.length}
    {#each list as { items, image }}
      <section class="py-section container-primary">
        <div
          class="grid grid-cols-1 gap-x-[25px] gap-y-[56px] md:grid-cols-2 lg:grid-cols-3"
        >
          {#each items as { name, slug, _id, category, gallery, url } (_id)}
            <div in:fade out:fade={{ duration: 0 }}>
              <Card
                el="a"
                href={`/preview/vr/${slug.current}`}
                class="flex flex-col gap-y-[20px]"
                let:Title
                let:Container
                let:Subtitle
              >
                <div
                  class="pointer-events-none h-auto overflow-hidden rounded-[12px] max-md:aspect-video md:h-[14.125rem]"
                >
                  <iframe
                    class="h-full w-full scale-125 object-cover"
                    title={name}
                    src={url}
                    frameborder="0"
                  ></iframe>
                </div>

                <Container>
                  <Title class="inline">{name}</Title>
                  <h6
                    class="inline text-[1rem] font-medium tracking-[0.02rem] text-[#1B1B1E]"
                  >
                    / {gallery.name}
                  </h6>

                  <Subtitle class="font-abc-arizona-serif text-sonic-silver"
                    >{category.name}</Subtitle
                  >
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
