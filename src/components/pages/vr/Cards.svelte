<script lang="ts">
  import type { Vr } from '@/lib/types/vr.types';
  import Card from '@/components/ui/card/Card.svelte';
  import { cn } from '@/lib/cn';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  export let items: Vr[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, _id, category, gallery, thumbnail } (_id)}
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={`/preview/vr/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
        let:Title
        let:Container
        let:Subtitle
        let:Image>
        <Image image={thumbnail} />
        <Container>
          <Title class="inline">{name}</Title>
          <h4
            class="inline text-[1rem] font-medium tracking-[0.02rem] text-eerie-black">
            / {gallery.name}
          </h4>

          <Subtitle class="font-inter text-sonic-silver">
            {category.name}
          </Subtitle>
        </Container>
      </Card>
    </div>
  {/each}
</div>
