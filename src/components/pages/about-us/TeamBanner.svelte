<script lang="ts">
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamBannerProps } from '@/lib/types/aboutUs.types';

  export let props: TeamBannerProps;
  let { title, image } = props;

  $: bg = imageBuilder
    .image(image)
    .withOptions({ auto: 'format' })
    .maxWidth(1920)
    .url();
</script>

<section
  style="background-image: url({bg}), url({image.asset.metadata.lqip});"
  class="relative h-screen w-full bg-cover bg-fixed bg-center"
>
  <header
    class="relative z-10 flex h-full w-full items-center justify-center text-white"
  >
    <h2 class="head-5xl font-abc-arizona-serif">
      {title}
    </h2>
  </header>
</section>
