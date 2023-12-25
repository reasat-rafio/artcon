<script lang="ts">
  import type { SliderProps, WithExtra } from '@/lib/types/landing.types';
  import SliderItemWrapper from './SliderItemWrapper.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';

  export let props: WithExtra<SliderProps>;

  $: ({
    index,
    sliderImageVideo,
    _type,
    name,
    slug,
    startDate,
    title,
    endDate,
    exhibitionType,
    subtitle,
  } = props);

  $: href =
    _type === 'exhibition'
      ? `/preview/exhibition/${slug?.current}`
      : `/preview/${_type === 'documentary' ? 'audio-visual' : _type}/${
          slug?.current
        }`;
</script>

<SliderItemWrapper {index} {sliderImageVideo} {href}>
  <div
    class="absolute bottom-0 left-0 z-10 space-y-[0.62rem] text-white transition-transform duration-500 ease-out group-hover:translate-y-[-0.8rem] max-lg:px-[1.25rem] max-lg:pb-[2.8rem] lg:pb-[5rem] lg:pl-[3.38rem] xl:w-[90%]">
    <h2 class="head-6">{title}</h2>
    <div>
      <h3 class="head-4 inline">{name}</h3>

      {#if _type === 'exhibition'}
        / {#if typeof exhibitionType === 'string'}
          <h4 class="head-6 inline">
            {exhibitionType}
          </h4>
        {:else}
          <h4 class="head-6 inline">
            {exhibitionType?.en}
          </h4>
        {/if}
      {:else if _type === 'event'}
        {@const { date, status } = calculateStatusBetweenDates({
          startDate,
          endDate,
          longFormat: true,
        })}

        <h4 class="head-6 inline">
          / {subtitle || (status !== 'Ongoing' ? date : status)}
        </h4>
      {:else if !!subtitle}
        <h4 class="head-6 inline">
          / {subtitle}
        </h4>
      {/if}
    </div>
  </div>
</SliderItemWrapper>
