<script lang="ts">
  import type {
    ImageUrlBuilderOptionsWithAliases,
    SanityImageSource,
  } from '@sanity/image-url/lib/types/types';
  import { defaultSanityImageDefaults } from './defaults';

  import {
    generateWidths,
    isSanityDimensionedImage,
    isSanityImageWithLqip,
  } from './fns';
  import type { AutoWidths, SanityImageProps } from './types';
  import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

  import type { HTMLImgAttributes } from 'svelte/elements';

  type $$Props = SanityImageProps & Omit<HTMLImgAttributes, 'src'>;

  //Max default allows for 1920px width @ 2x
  const defaults = (globalThis.sanityImageDefaults ??=
    defaultSanityImageDefaults);

  export let imageUrlBuilder: ImageUrlBuilder | undefined =
    defaults.imageUrlBuilder;
  export let src: SanityImageSource;
  export let widths: number[] | AutoWidths = defaults.autoWidths;
  export let lqip: boolean = defaults.lqip;
  export let options: Partial<ImageUrlBuilderOptionsWithAliases> = {};
  export let autoFormat: boolean = defaults.autoFormat;

  function imgProps() {
    const builder = imageUrlBuilder
      ?.image(src)
      .withOptions({ auto: autoFormat ? 'format' : undefined });

    if (!builder) {
      throw new Error('No image url builder specified, and no default set!');
    }

    const determinedWidths = Array.isArray(widths)
      ? widths
      : generateWidths(widths ?? defaults.autoWidths, src);

    const determinedLqip = lqip ?? defaults.lqip;

    const [width, height] = isSanityDimensionedImage(src)
      ? [
          src.asset.metadata.dimensions.width,
          src.asset.metadata.dimensions.height,
        ]
      : [undefined, undefined];

    const srcset = determinedWidths
      .map(
        (w: number) =>
          `${builder
            .width(w)
            .withOptions(options ?? {})
            .url()} ${w}w`
      )
      .join(', ');

    const lqipStyle = `background: ${
      isSanityImageWithLqip(src)
        ? `url(${src.asset.metadata.lqip}) no-repeat`
        : undefined
    }; background-size: cover; `;
    let style = (lqip ? lqipStyle : '') + ($$restProps.style ?? '');

    return { builder, determinedLqip, width, height, srcset, style };
  }

  let img: HTMLImageElement | undefined;

  let props = imgProps();
</script>

<!-- alt tag will come from parent -->
<!-- svelte-ignore a11y-missing-attribute -->
<img
  bind:this={img}
  src={props.builder.url()}
  srcset={props.srcset}
  width={props.width}
  height={props.height}
  style={props.style}
  {...$$restProps}
/>
