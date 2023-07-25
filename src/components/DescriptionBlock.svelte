<script lang="ts">
  import type { DescriptionBlock } from '@/lib/types/common.types';

  export let props: DescriptionBlock;
  let { description } = props;
</script>

<article class="grid grid-cols-12">
  <div class="col-span-4">
    <slot />
  </div>

  <p class="col-span-8">{description}</p>
</article>
