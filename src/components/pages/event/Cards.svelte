<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import { cn } from '@/lib/cn';
  import type { Event } from '@/lib/types/event.types';
  import { flip } from 'svelte/animate';

  export let items: Event[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start  md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, tag, asset, _id } (_id)}
    <div animate:flip={{ duration: 400 }}>
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
