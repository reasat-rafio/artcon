<script lang="ts">
  import type { Event } from '@/lib/types/event.types';
  import { fade } from 'svelte/transition';
  import Card from '@/components/ui/card/Card.svelte';

  export let items: Event[];
</script>

<div
  class="grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] md:grid-cols-2 xl:grid-cols-3">
  {#each items as { name, slug, tag, asset, _id } (_id)}
    <div in:fade out:fade={{ duration: 0 }}>
      <Card
        el="a"
        href={`/event/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
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
