<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';
  import { DefaultBlock } from '@portabletext/svelte';
  import H1 from '@/components/ui/H1.svelte';
  import H2 from '@/components/ui/H2.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import H5 from '@/components/ui/H5.svelte';

  export let portableText: BlockComponentProps;

  let {
    value: { style },
  } = portableText;
</script>

{#if style === 'h1'}
  <H1>
    <slot />
  </H1>
{:else if style === 'h2'}
  <H2>
    <slot />
  </H2>
{:else if style === 'h3'}
  <H3>
    <slot />
  </H3>
{:else if style === 'h4'}
  <H4>
    <slot />
  </H4>
{:else if style === 'h5'}
  <H5 uppercase={false} class="!text-blue-dark">
    <slot />
  </H5>
{:else if style === 'blockquote'}
  <!-- <span
    class="flex rounded-b-[25px] rounded-tr-[25px] bg-blue-main px-10 py-7 text-lg text-white lg:my-2.5 lg:px-[70px] lg:py-10 lg:text-2xl"
  >
    <span class="relative">
      <Coolicon />
      <slot />
    </span>
  </span> -->
{:else}
  <div class="">
    <DefaultBlock {portableText}>
      <slot />
    </DefaultBlock>
  </div>
{/if}
