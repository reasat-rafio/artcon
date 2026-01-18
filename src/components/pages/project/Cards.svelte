<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import { cn } from '@/lib/cn';
  import type { Project } from '@/lib/types/project.types';
  import { fade } from 'svelte/transition';

  export let items: Project[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[2.0001rem] self-start md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, tag, _id, asset, subtitle } (_id)}
    <div in:fade>
      <Card
        el="a"
        href={`/project/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
        let:Asset
        let:Title
        let:Container
        let:Subtitle>
        <Asset class="overflow-hidden rounded-[12px]" {asset} />
        <Container>
          <Title>{name}{#if subtitle} / <span class="head-8">{subtitle}</span>{/if}</Title>
          <div class="font-inter text-sonic-silver text-[14px] font-[300]">
            {tag.name}
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>
