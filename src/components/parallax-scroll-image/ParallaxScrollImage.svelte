<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import { twMerge } from 'tailwind-merge';
  import FirstImage from './FirstImage.svelte';
  import SecondImage from './SecondImage.svelte';

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
    class={twMerge(
      'grid w-[85%] grid-cols-12 items-center gap-[30px]',
      $$props.class ?? ''
    )}
  >
    <div
      class="col-span-4 translate-y-[-10%]"
      use:parallaxOnScrollAction={{ scrollY, intersecting }}
    >
      <slot name="first-image" Image={FirstImage} />
    </div>
    <div class="col-span-8">
      <slot name="second-image" Image={SecondImage} />
    </div>
  </div>
</IntersectionObserver>
