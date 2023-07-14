<script lang="ts">
  // import type { PageProps } from '@/lib/types/common.types';
  import { timeline } from 'motion';
  import { onMount, tick } from 'svelte';

  // export let data: PageProps<{}>;

  const defaultColumWidth = '50vw';
  const activeColumWidth = '100vw';
  let rootEl: HTMLDivElement;
  let containerEl: HTMLDivElement;
  let sections = [1, 2, 3, 4, 5];
  let activeIndex: null | number = null;

  // onMount(() => {
  //   containerEl.style.width = containerWidth;
  // });

  $: containerWidth =
    activeIndex !== null
      ? `${sections.length * 50 + 50}vw`
      : `${sections.length * 50}vw`;

  function animation(
    node: HTMLElement,
    _: { index: number; activeIndex: number | null }
  ) {
    node.style.width = defaultColumWidth;

    return {
      update({
        index,
        activeIndex,
      }: {
        index: number;
        activeIndex: number | null;
      }) {
        let isActive = activeIndex === index;
        if (isActive) {
          timeline([
            [
              containerEl,
              { width: [containerEl.style.width, containerWidth] },
              { duration: 0 },
            ],
            [node, { width: [node.style.width, activeColumWidth] }],
          ]);
        } else {
          timeline([
            [
              containerEl,
              { width: [containerEl.style.width, containerWidth] },
              { duration: 0 },
            ],
            [node, { width: [node.style.width, defaultColumWidth] }],
          ]);
        }
      },
    };
  }
</script>

<div
  class="w-screen overflow-x-hidden"
  bind:this={rootEl}
  on:wheel={(event) => {
    const scrollAmount = event.deltaY;
    rootEl.scrollLeft += scrollAmount;
  }}
>
  <div class="fixed inset-0 w-screen h-screen bg-green-600">Hi</div>
  <div
    bind:this={containerEl}
    style="width: {sections.length * 50}vw;"
    class="relative z-50 flex h-screen space-x-5 translate-x-[100vw] bg-red-600"
  >
    {#each sections as s, index}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        use:animation={{ index, activeIndex }}
        on:click={(e) => {
          if (e.target instanceof HTMLElement) {
            console.log(e.target.getBoundingClientRect());
          }
          if (activeIndex !== index) activeIndex = index;
          else activeIndex = null;
        }}
        class="h-full origin-center bg-yellow-400"
      >
        {s}
      </div>
    {/each}
  </div>
</div>
