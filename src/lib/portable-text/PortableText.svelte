<script lang="ts">
  import {
    PortableText,
    type PortableTextComponents,
  } from '@portabletext/svelte';
  import type { PortableTextBlock } from 'sanity';
  // import Block from './Block.svelte';
  // import Break from './Break.svelte';
  // import Bullet from './Bullet.svelte';
  // import Highlight from './Highlight.svelte';
  // import Image from './Image.svelte';
  // import Link from './Link.svelte';
  // import List from './List.svelte';
  // import PrimaryBullet from './PrimaryBullet.svelte';
  // import Styled from './Styled.svelte';

  export let value: PortableTextBlock[];
  export let components: PortableTextComponents | undefined = undefined;
  export let boldType: 'light' | 'dense' = 'dense';

  const defaultComponents = {
    // block: Block,
    // list: List,
    // listItem: {
    //   primaryBullet: PrimaryBullet,
    //   normal: Bullet,
    // },
    // marks: {
    //   highlight: Highlight,
    //   link: Link,
    //   styled: Styled,
    // },
    // types: {
    //   image: Image,
    //   break: Break,
    // },
  };

  const valueProps = {
    value: value,
    components: defaultComponents as any,
  };

  let componentRef: HTMLDivElement;
</script>

<div
  style="--weight: {boldType === 'dense' ? '600' : '400'}"
  class="description {$$props.class}"
  bind:this={componentRef}>
  <PortableText {...valueProps} {...components} />
</div>

<style>
  .description :global(strong) {
    font-weight: var(--weight);
  }
  .description :global(p:empty) {
    padding-bottom: 1rem;
  }

  .description :global(a) {
    text-decoration: underline;
  }
</style>
