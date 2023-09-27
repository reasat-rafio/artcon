<script lang="ts">
  import Asset from '@/components/hero/Asset.svelte';
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
            class="flex-[0_0_90%] overflow-hidden md:flex-[0_0_70%] xl:flex-[0_0_50%]"
          >
            <div
              class="relative mb-[1.25rem] aspect-square overflow-hidden rounded-lg odd:mr-[0.94rem] even:ml-[94rem] lg:mb-[4.03rem] odd:lg:mr-[1.81rem] even:lg:ml-[1.81rem]"
            >
              <Asset {asset} />
            </div>
            <div class="border-[#D2D2D3] lg:border-t lg:pt-[2.25rem]">
              <div
                class="space-y-[10px] odd:lg:mr-[1.81rem] even:lg:ml-[1.81rem]"
              >
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
