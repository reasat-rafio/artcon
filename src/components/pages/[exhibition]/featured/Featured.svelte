<script lang="ts">
  import type { FeaturedProps } from '@/lib/types/exhibitionDetail.types';
  import SoloExhibition from './SoloExhibition.svelte';

  export let props: FeaturedProps;
  let { featured } = props;
</script>

<section>
  <div class="container">
    {#if featured._type === 'exhibition.featured.solo'}
      <SoloExhibition props={featured} />
    {/if}
  </div>
</section>
