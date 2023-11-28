<script lang="ts">
  import type { Vr } from '@/lib/types/vr.types';
  import Card from '@/components/ui/card/Card.svelte';
  import { fade } from 'svelte/transition';
  import { cn } from '@/lib/cn';

  export let items: Vr[];
</script>

<div
  class={cn(
    'grid grid-cols-1 gap-x-[1.563rem] gap-y-[3.5rem] self-start md:grid-cols-2 xl:grid-cols-3',
    $$props.class,
  )}>
  {#each items as { name, slug, _id, category, gallery, url } (_id)}
    <div in:fade out:fade={{ duration: 0 }}>
      <Card
        el="a"
        href={`/preview/vr/${slug.current}`}
        class="flex flex-col gap-y-[1.25rem]"
        let:Title
        let:Container
        let:Subtitle>
        <div
          class="pointer-events-none h-auto overflow-hidden rounded-[12px] max-md:aspect-video md:h-[14.125rem]">
          <iframe
            class="h-full w-full scale-125 object-cover"
            title={name}
            src={url}
            frameborder="0">
          </iframe>
        </div>

        <Container>
          <Title class="inline">{name}</Title>
          <h6
            class="inline text-[1rem] font-medium tracking-[0.02rem] text-[#1B1B1E]">
            / {gallery.name}
          </h6>

          <Subtitle class="font-optiberling-agency text-sonic-silver">
            {category.name}
          </Subtitle>
        </Container>
      </Card>
    </div>
  {/each}
</div>
