<script lang="ts">
  import type { VRExhibition } from '@/lib/types/common.types';
  import IntersectionObserver from 'svelte-intersection-observer';

  export let props: VRExhibition;
  let { image, url } = props;

  let rootEl: HTMLElement;
  let frameEl: HTMLIFrameElement;

  let intersecting: false;

  // $: if (intersecting) {
  //   frameEl.src =
  //     'https://my.matterport.com/show/?m=gkskndswhuV&play=1&nt=1&help=0';
  // }
</script>

<IntersectionObserver element={rootEl} bind:intersecting once>
  <section bind:this={rootEl}>
    <div class="container h-full w-full">
      <!-- <iframe
        class="h-[600px] w-full"
        bind:this={frameEl}
        src=""
        title="preview"
      /> -->
    </div>
  </section>
</IntersectionObserver>
