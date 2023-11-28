<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import type { Collection } from '@/lib/types/collection.types';
  import { fade } from 'svelte/transition';
  import { cn } from '@/lib/cn';

  export let items: Collection[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, _id, artworkImage, artist, media, year } (_id)}
    <div in:fade out:fade={{ duration: 0 }}>
      <Card
        el="a"
        href={`/collection/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
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
