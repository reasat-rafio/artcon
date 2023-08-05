<script lang="ts">
  import H1 from '@/components/ui/H1.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import H7 from '@/components/ui/H7.svelte';
  import { useDebounce } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CommonHeroListProps } from '@/lib/types/common.types';

  type WheelEventType = WheelEvent & {
    currentTarget: EventTarget & HTMLElement;
  };

  export let props: CommonHeroListProps;
  let { blocks } = props;

  let rootEl: HTMLElement;
  let scrollDirection: 'up' | 'down' = 'down';
  let blocksPositions = Array.from({ length: blocks.length }, (_, i) => i);

  const slideNext = () => {
    const firstPosition = blocksPositions.shift();
    blocksPositions.push(firstPosition as number);
    blocksPositions = blocksPositions;
  };

  const sliedPrev = () => {
    const lastPosition = blocksPositions.pop();
    blocksPositions.unshift(lastPosition as number);
    blocksPositions = blocksPositions;
  };

  const onMouseWheelAction = (e: WheelEventType) => {
    e.deltaY > 0 ? (scrollDirection = 'down') : (scrollDirection = 'up');
    if (scrollDirection === 'up') slideNext();
    else if (scrollDirection === 'down') sliedPrev();
  };

  const getBlockNodes = () => {
    const nextPosition = blocksPositions[1];
    const prevPosition = blocksPositions[2];

    let active = rootEl.childNodes[blocksPositions.indexOf(0)];
    let next = rootEl.childNodes[blocksPositions.indexOf(nextPosition)];
    let prev = rootEl.childNodes[blocksPositions.indexOf(prevPosition)];

    return { active, next, prev };
  };

  $: if (blocksPositions && rootEl) {
    const { active, next, prev } = getBlockNodes();
  }
</script>

<section
  bind:this={rootEl}
  on:wheel|preventDefault|stopPropagation={(e) =>
    useDebounce(() => onMouseWheelAction(e), 1000)}
  class="relative h-screen"
>
  {#each blocks as { asset: { image, video }, title, cta, subtitle, type }, index}
    <div
      style="z-index: {blocks.length - blocksPositions[index]};"
      class="absolute left-0 top-0 flex h-full w-full items-center justify-center"
    >
      {#if !!image}
        <SanityImage
          draggable={false}
          class="absolute h-full w-full object-cover"
          lqip
          sizes="100vw"
          alt={image.alt}
          src={image}
          imageUrlBuilder={imageBuilder}
        />
      {:else if !!video}
        <video
          class="absolute h-full w-full object-cover"
          width="100%"
          height="100%"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          controls={false}
          playsInline
          autoPlay
          muted
          loop
        >
          <source src={video?.mov} type="video/mp4; codecs=hvc1" />
          <source src={video?.webm} type="video/webm" />
          Sorry, your browser doesn&apos;t support embedded videos.
        </video>
      {/if}
      <!-- <p>{blocksPositions[index] + }</p> -->
      <div class="container relative z-30 text-center text-white">
        <header class="space-y-2">
          {#if !!type}
            <H7>{type}</H7>
          {/if}
          <H1>{title}</H1>
          {#if !!subtitle}
            <H3 class="whitespace-pre-wrap">{subtitle}</H3>
          {/if}
        </header>
        {#if !!cta?.title}
          <a href={cta.href}>{cta.title}</a>
        {/if}
      </div>
    </div>
  {/each}

  <div class="absolute bottom-0 left-0 z-20 w-full px-5 py-10">
    <!--  -->
    <!--  -->
    <!--  -->
  </div>
</section>
