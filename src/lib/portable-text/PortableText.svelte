<script lang="ts">
  import type { PortableTextComponents } from '@portabletext/svelte';
  import { PortableText } from '@portabletext/svelte';
  import type { InputValue } from '@portabletext/svelte/ptTypes';
  import { onMount } from 'svelte';
  import Block from './Block.svelte';
  import Break from './Break.svelte';
  import Bullet from './Bullet.svelte';
  import Highlight from './Highlight.svelte';
  import Image from './Image.svelte';
  import Link from './Link.svelte';
  import List from './List.svelte';
  import PrimaryBullet from './PrimaryBullet.svelte';
  import Styled from './Styled.svelte';

  export let value: InputValue;
  export let components: PortableTextComponents | undefined = undefined;

  const defaultComponents = {
    block: Block,
    list: List,
    listItem: {
      primaryBullet: PrimaryBullet,
      normal: Bullet,
    },
    marks: {
      highlight: Highlight,
      link: Link,
      styled: Styled,
    },
    types: {
      image: Image,
      break: Break,
    },
  };

  const valueProps = {
    value: value,
    components: defaultComponents as any,
  };

  let componentRef: HTMLDivElement;
  onMount(() => {
    const paragraphs = componentRef.querySelectorAll('p');

    Array.from(paragraphs).forEach((paragraph) => {
      if (!paragraph.innerText) {
        paragraph.style.paddingBottom = '1em';
      }
    });
  });
</script>

<div bind:this={componentRef}>
  <PortableText {...valueProps} {...components} />
</div>
