<script lang="ts">
  import type { SliderProps, WithExtra } from '@/lib/types/landing.types';
  import SliderItemWrapper from './SliderItemWrapper.svelte';

  export let props: WithExtra<SliderProps>;

  $: ({
    index,
    sliderImageVideo,
    _type,
    name,
    slug,
    title,
    exhibitionType,
    subtitle,
    type,
    tag,
    artistName,
  } = props);
  $: href =
    _type === 'exhibition'
      ? `/preview/exhibition/${slug?.current}`
      : `/preview/${_type === 'documentary' ? 'audio-visual' : _type}/${
          slug?.current
        }`;

  $: startDate = (_type === 'exhibition' || _type === 'event') && 'startDate' in props ? props.startDate : undefined;
  $: endDate = (_type === 'exhibition' || _type === 'event') && 'endDate' in props ? props.endDate : undefined;
  $: documentationImages = _type === 'event' && 'documentationImages' in props ? props.documentationImages : undefined;
  $: invitationCardImage = _type === 'exhibition' && 'invitationCardImage' in props ? props.invitationCardImage : undefined;
</script>

<SliderItemWrapper {index} {sliderImageVideo} {href}>
  <div
    class="absolute bottom-0 left-0 z-10 space-y-[0.62rem] text-white transition-transform duration-500 ease-out group-hover:translate-y-[-0.8rem] max-lg:px-[1.25rem] max-lg:pb-[2.8rem] lg:pb-[5rem] lg:pl-[3.38rem] xl:w-[90%]">
    {#if _type === 'documentary'}
      <h2 class="head-6 capitalize drop-shadow-4xl">Our {type?.name}</h2>
    {:else}
      <h2 class="head-6 capitalize drop-shadow-4xl">{title}</h2>
    {/if}

    <div>
      <h3 class="head-4 inline drop-shadow-4xl">{name}</h3>

      {#if _type === 'exhibition'}
        /
        {#if !!subtitle}
          <h4 class="head-6 inline !font-medium drop-shadow-4xl">{subtitle}</h4>
        {:else if !!artistName?.en}
          <h4 class="head-6 inline !font-medium drop-shadow-4xl">
            {artistName.en}
          </h4>
        {:else if typeof exhibitionType === 'string'}
          <h4 class="head-6 inline !font-medium drop-shadow-4xl">
            {exhibitionType}
          </h4>
        {:else}
          <h4 class="head-6 inline !font-medium drop-shadow-4xl">
            {exhibitionType?.en}
          </h4>
        {/if}
      {:else if _type === 'event'}
        <h4 class="head-6 inline !font-medium drop-shadow-4xl">
          / {subtitle || tag?.name}
        </h4>
      {:else if _type === 'collection' && (!!artistName?.en || !!subtitle)}
        <h4 class="head-6 inline !font-medium drop-shadow-4xl">
          / {subtitle || artistName?.en}
        </h4>
      {:else if !!subtitle}
        <h4 class="head-6 inline !font-medium drop-shadow-4xl">
          / {subtitle}
        </h4>
      {/if}
    </div>
    
    <!-- Category/Type/Tag Badge -->
    {#if _type === 'publication' && type?.name}
      <span class="inline-block rounded-full bg-white/20 px-2.5 py-1 text-xs font-normal backdrop-blur-sm drop-shadow-4xl">
        {type.name}
      </span>
    {:else if _type === 'exhibition' && exhibitionType}
      <span class="inline-block rounded-full bg-white/20 px-2.5 py-1 text-xs font-normal backdrop-blur-sm drop-shadow-4xl">
        {typeof exhibitionType === 'string' ? exhibitionType : exhibitionType?.en}
      </span>
    {:else if _type === 'vr' && type?.name}
      <span class="inline-block rounded-full bg-white/20 px-2.5 py-1 text-xs font-normal backdrop-blur-sm drop-shadow-4xl">
        {type.name}
      </span>
    {:else if _type === 'collection' && tag?.name}
      <span class="inline-block rounded-full bg-white/20 px-2.5 py-1 text-xs font-normal backdrop-blur-sm drop-shadow-4xl">
        {tag.name}
      </span>
    {:else if _type === 'event' && tag?.name}
      <span class="inline-block rounded-full bg-white/20 px-2.5 py-1 text-xs font-normal backdrop-blur-sm drop-shadow-4xl">
        {tag.name}
      </span>
    {:else if _type === 'documentary' && type?.name}
      <span class="inline-block rounded-full bg-white/20 px-2.5 py-1 text-xs font-normal backdrop-blur-sm drop-shadow-4xl">
        {type.name}
      </span>
    {/if}
  </div>
</SliderItemWrapper>
