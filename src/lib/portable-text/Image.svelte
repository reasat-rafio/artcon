<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  import H4 from '@/components/ui/H4.svelte';
  import { imageBuilder } from '../sanity/sanityClient';
  import SanityImage from '../sanity/sanity-image/sanity-image.svelte';
  import PortableText from './PortableText.svelte';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';

  export let portableText: CustomBlockComponentProps<SanityAsset>;
  let { value } = portableText;
</script>

{#if value?.title && value?.description}
  <div class=" grid gap-10 lg:my-5 lg:grid-cols-[1fr_2fr]">
    <SanityImage
      src={value}
      alt={value?.alt}
      imageUrlBuilder={imageBuilder}
      class="aspect-square h-full w-full overflow-hidden rounded-lg object-cover"
      sizes="(min-width:768px) 30vw, 100vw" />
    <div>
      <H4 class="mb-5">{value.title}</H4>
      <PortableText value={value.description} />
    </div>
  </div>
{:else}
  <SanityImage
    src={value}
    alt={value?.alt}
    imageUrlBuilder={imageBuilder}
    sizes="(min-width:768px) 80vw, 100vw"
    class="mx-auto max-h-[600px] w-full overflow-hidden rounded-lg lg:my-5" />
{/if}
