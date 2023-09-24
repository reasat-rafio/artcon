<script lang="ts">
  import Asset from '@/components/hero/Asset.svelte';
  import H6 from '@/components/ui/H6.svelte';
  import H8 from '@/components/ui/H8.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { OtherExhibitionProps } from '@/lib/types/exhibitionDetail.types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';

  export let exhibitions: OtherExhibitionProps[];
  $: exhibitions;

  const statusOrder = {
    Ongoing: 0,
    Upcoming: 1,
    Completed: 2,
  } as const;

  exhibitions.sort((a, b) => {
    const { status: statusA } = calculateStatusBetweenDates({
      startDate: a.startDate,
      endDate: a.endDate,
    });

    const { status: statusB } = calculateStatusBetweenDates({
      startDate: b.startDate,
      endDate: b.endDate,
    });

    return statusOrder[statusA] - statusOrder[statusB];
  });

  let emblaApi: EmblaCarouselType;
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<section>
  <div class="py-section container border-t border-[#BBBBBE]">
    <h2 class="head-xl">Other Exhibition</h2>
    <div
      class="mt-[32px] overflow-hidden"
      use:emblaCarouselSvelte={{ plugins: [], options: { align: 'start' } }}
      on:emblaInit={onInit}
    >
      <div class="flex">
        {#each exhibitions as { slug, type, name, asset }}
          <a
            href="/exhibition/{slug.current}"
            class="flex-[0_0_50%] overflow-hidden"
          >
            <div
              class="relative mb-[64px] aspect-square overflow-hidden rounded-lg odd:mr-[30px] even:ml-[30px]"
            >
              <Asset {asset} />
            </div>
            <div class="border-t border-[#D2D2D3] pt-[36px]">
              <div class="space-y-[10px] odd:mr-[30px] even:ml-[30px]">
                <header class="flex flex-wrap items-center">
                  <h3 class="text-head-6">{name}</h3>
                  <h4 class="text-head-8">
                    /
                    {#if typeof type === 'string'}
                      {type}
                    {:else}
                      {type.name}
                    {/if}
                  </h4>
                </header>
                <h4 class="text-head-8 text-[#77777C]">
                  Photography exhibition
                </h4>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
