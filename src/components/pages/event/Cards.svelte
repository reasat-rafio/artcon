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
    <div animate:flip={{ duration: 500 }} in:fade>
      <Card
        el="a"
        href={`/event/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
        let:Asset
        let:Title
        let:Container
        let:Subtitle>
        <Asset class="overflow-hidden rounded-[12px]" {asset} />
        <Container>
          <div>
            <Title class="inline">{name}</Title>
       
              <div class="flex justify-between">
                <div  class="font-optiberling-agency text-sonic-silver">
                   {subtitle || tag?.name}
                </div>
               <div>
                 {#if startDate}
                  <span class="font-optiberling-agency text-sonic-silver pr-1">
                    {calculateStatusBetweenDates({ startDate, endDate }).date}
                  </span>
                {/if}
               </div>
              </div>
          </div>
        </Container>
      </Card>
    </div>
  {/each}
</div>

