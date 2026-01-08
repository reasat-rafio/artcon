<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import { cn } from '@/lib/cn';
  import type { Event } from '@/lib/types/event.types';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { calculateStatusBetweenDates } from '@/lib/helper';

  export let items: Event[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start  md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, tag, asset, _id, subtitle, startDate, endDate } (_id)}
    {@const { status } = calculateStatusBetweenDates({ startDate, endDate })}
    {@const cardHref = status === 'Upcoming' ? `/preview/event/${slug.current}` : `/event/${slug.current}`}
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={cardHref}
        class="flex flex-col gap-y-[1.25rem]"
        let:Asset
        let:Title
        let:Container
        let:Subtitle>
        <Asset class="overflow-hidden rounded-[12px]" {asset} />
        <Container>
          <div>
            <Title class="inline">{name}</Title>
            {#if subtitle}
              <h4
                class="inline text-[1rem] font-medium tracking-[0.02rem] text-eerie-black">
                / {subtitle}
              </h4>
            {/if}
          </div>
          <div class="flex justify-between">
            <div class="font-inter text-sonic-silver break-words overflow-wrap-anywhere flex-1 pr-2 text-[14px] font-[300]">
              {tag?.name}
            </div>
            <div class="flex-shrink-0">
              {#if startDate}
                <span class="font-inter text-sonic-silver pr-1 whitespace-nowrap text-[14px] font-[400]">
                  {calculateStatusBetweenDates({ startDate, endDate }).date}
                </span>
              {/if}
            </div>
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>

