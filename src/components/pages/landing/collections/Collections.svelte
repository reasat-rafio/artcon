<script lang="ts">
  import Asset from '@/components/hero/Asset.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import { timeline } from 'motion';

  export let props: CollectionsProps;
  $: ({ collections } = props);

  let rootEl: HTMLElement;
  let containerEl: HTMLDivElement;
  let activeIndex: null | number = null;
  const defaultColumWidth = '50vw';
  const activeColumWidth = '100vw';

  $: containerWidth =
    activeIndex !== null
      ? `${collections.length * 50 + 50}vw`
      : `${collections.length * 50}vw`;

  function init(node: HTMLElement) {
    node.style.width = `${collections.length * 50}vw`;
  }

  function animation(
    node: HTMLElement,
    _: { index: number; activeIndex: number | null },
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
          console.log('not');

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

<section class="translate-x-[100vw]" bind:this={rootEl}>
  <div bind:this={containerEl} use:init class="flex">
    {#each collections as collection, index}
      {#if collection._type === 'vr'}
        <a
          href="/preview/vr/{collection.slug.current}"
          on:click={(e) => {
            if (e.target instanceof HTMLElement) {
              console.log(e.target.getBoundingClientRect());
            }
            if (activeIndex !== index) activeIndex = index;
            else activeIndex = null;
          }}
          use:animation={{ index, activeIndex }}
          class="relative h-screen"
        >
          <SanityImage
            class="h-full w-full object-cover"
            src={collection.previewImage}
            sizes="30vw"
            imageUrlBuilder={imageBuilder}
            alt={collection.name}
          />
        </a>
      {/if}
    {/each}
  </div>
</section>
