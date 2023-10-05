<script lang="ts">
  import ImageAsset from '@/components/ImageAsset.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { FormatedItem } from '@/lib/helper';
  import type { Exhibition } from '@/lib/types/exhibition.types';

  export let list: FormatedItem<Exhibition>[];
</script>

<div>
  {#each list as { items, image }}
    <section class="py-section container">
      <div class="grid grid-cols-3 gap-x-[25px] gap-y-[56px]">
        {#each items as { name, slug, tag, type, previewDisplayImage }}
          <Card
            el="a"
            href={`/exhibition/${slug.current}`}
            class="space-y-[20px] pl-[20px]"
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
        {/each}
      </div>
    </section>
    {#if !!image}
      <ImageAsset props={image} />
    {/if}
  {/each}
</div>
