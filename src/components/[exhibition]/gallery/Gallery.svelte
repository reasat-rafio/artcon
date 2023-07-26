<script lang="ts">
  import DescriptionBlock from '@/components/DescriptionBlock.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import type { GalleryProps } from '@/lib/types/exhibitionDetail.types';
  import { onMount } from 'svelte';

  export let props: GalleryProps;
  let {
    descriptionBlock: { title, description },
    images,
  } = props;

  let swiperEl: HTMLElement,
    swiperObj = null;
</script>

<section>
  <div class="container pt-xl">
    <div>
      <!--  -->
    </div>

    <DescriptionBlock class="mb-xl" {description}>
      <H4>{title}</H4>
    </DescriptionBlock>
  </div>
</section>
