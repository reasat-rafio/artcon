<script lang="ts">
  import type { Documentary } from '@/lib/types/documentary.types';
  import Card from '@/components/ui/card/Card.svelte';
  import { cn } from '@/lib/cn';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  export let items: Documentary[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, _id, category, coverImage } (_id)}
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={`/preview/audio-visual/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
        let:Asset
        let:Title
        let:Container
        let:Subtitle>
        <Asset asset={{ image: coverImage }} />
        <Container>
          <div>
            <Title class="inline">{name}</Title>
          </div>
          <Subtitle class="font-optiberling-agency text-sonic-silver">
            {category.name}
          </Subtitle>
        </Container>
      </Card>
    </div>
  {/each}
</div>
