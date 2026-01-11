<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import { cn } from '@/lib/cn';
  import type { Exhibition } from '@/lib/types/exhibition.types';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { calculateStatusBetweenDates } from '@/lib/helper';

  export let items: Exhibition[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, tag, type, asset, _id, subtitle, startDate, endDate, exhibitionType } (_id)}
    {@const { status } = calculateStatusBetweenDates({ startDate, endDate })}
    {@const cardHref = status === 'Upcoming' ? `/preview/exhibition/${slug.current}` : `/exhibition/${slug.current}`}
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={cardHref}
        class="flex flex-col gap-y-[1.25rem]"
        let:Asset
        let:Title
        let:Container
        let:Subtitle>
        <div class="relative overflow-hidden rounded-[12px]">
          <Asset {asset} />
        </div>
        <Container>
          <div>
            <Title class="inline">{name}</Title>
            <h4
              class="inline text-[1rem] font-medium tracking-[0.02rem] text-eerie-black">
              /
              {#if exhibitionType === 'group'}
                Group Exhibition
              {:else if exhibitionType === 'solo'}
                {typeof type === 'string' ? type : type.name}
              {:else if subtitle}
                {subtitle}
              {:else if typeof type === 'string'}
                {type}
              {:else}
                {type.name}
              {/if}
            </h4>
          </div>
          <div class="flex justify-between">
            <div class="font-inter text-sonic-silver text-[14px] font-[300]">
              {tag.name}
            </div>
            {#if startDate}
              <span class="font-inter text-sonic-silver pr-1 text-[14px] font-[300]">
                {calculateStatusBetweenDates({ startDate, endDate }).date}
              </span>
            {/if}
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>

