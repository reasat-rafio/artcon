<script lang="ts">
  import type { NavProps } from '@/lib/types/common.types';

  export let nav: NavProps;
  let { menu } = nav;
</script>

<aside class="fixed left-0 z-50 -translate-y-1/2 top-1/2">
  <nav class="flex flex-col mx-[40px] space-y-[23px]">
    {#each menu as { title, externalUrl, pageUrl }, index}
      <a
        href={pageUrl ?? externalUrl}
        class="font-semibold uppercase text-button text-white transition-colors duration-500 {index ===
        0
          ? 'opacity-100'
          : 'text-opacity-60 hover:text-opacity-100'}"
      >
        {title}
      </a>
    {/each}
  </nav>
</aside>
