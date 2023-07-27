<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  export let images: [SanityAsset, SanityAsset];

  let [firstImg, secondImg] = images;
  let scrollY = 0;
  let intersecting = false;
  let rootEl: HTMLDivElement;
  $: rootElHeight = rootEl?.getBoundingClientRect().height ?? 0;

  interface ParallaxOnScrollActionProps {
    scrollY: number;
    intersecting: boolean;
  }
  const parallaxOnScrollAction = (
    node: HTMLElement,
    _props: ParallaxOnScrollActionProps
  ) => {
    return {
      update({ intersecting }: ParallaxOnScrollActionProps) {
        if (intersecting) {
          let delta = Math.abs(
            Math.min(
              Math.max(node.getBoundingClientRect().top / rootElHeight, 0),
              1
            ) - 1
          );

          const keyframes = {
            transform: `translateY(${delta * -80}px)`,
          };

          node.animate(keyframes, {
            duration: 4000,
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
            fill: 'forwards',
          });
        }
      },
    };
  };
</script>

<svelte:window bind:scrollY />
<IntersectionObserver element={rootEl} bind:intersecting>
  <div
    bind:this={rootEl}
    class="{$$props.class ??
      ''} grid w-[85%] grid-cols-12 items-center gap-[30px]"
  >
    <div class="col-span-4">
      <figure
        class="translate-y-[-10%]"
        use:parallaxOnScrollAction={{ scrollY, intersecting }}
      >
        <SanityImage
          class="aspect-square w-full rounded-[20px] object-cover"
          sizes="30vw"
          src={firstImg}
          alt={firstImg.alt}
          imageUrlBuilder={imageBuilder}
        />
        <figcaption
          class="pl-[20px] pt-[20px] text-title-2 font-light text-sonic-silver"
        >
          {firstImg.caption}
        </figcaption>
      </figure>
    </div>
    <div class="col-span-8">
      <figure>
        <SanityImage
          sizes="70vw"
          src={secondImg}
          alt={secondImg.alt}
          class="h-full w-full rounded-[20px]"
          imageUrlBuilder={imageBuilder}
        />
        <figcaption
          class="pl-[20px] pt-[20px] text-title-2 font-light text-sonic-silver"
        >
          {secondImg.caption}
        </figcaption>
      </figure>
    </div>
  </div>
</IntersectionObserver>
