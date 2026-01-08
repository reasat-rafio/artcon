<script lang="ts">
  import type { Documentary } from '@/lib/types/documentary.types';
  import Card from '@/components/ui/card/Card.svelte';
  import { cn } from '@/lib/cn';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  export let items: Documentary[];

  function formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, _id, type, category, coverImage, duration } (_id)}
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={`/preview/audio-visual/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
        let:Asset
        let:Title
        let:Container
        let:Subtitle>
        <Asset class="overflow-hidden rounded-[12px]" asset={{ image: coverImage }} />
        <Container>
          <div>
            <Title class="inline">{name}</Title>
          </div>
          <div class="flex justify-between">
            <div class="font-inter text-sonic-silver text-[14px] font-[400]">
              {type.name} / {category.name}
            </div>
            {#if duration}
              <span class="font-inter text-sonic-silver pr-1 text-[14px] font-[400]">
                {duration}
              </span>
            {/if}
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>
