<script lang="ts">
  import Cta from '@/components/ui/Cta.svelte';
  import type { Cta as CTAProps } from '@/lib/types/common.types';
  import { fade } from 'svelte/transition';

  type CTA = CTAProps & { newTab?: boolean };
  export let ctas: [CTA, CTA];
</script>

<nav
  in:fade={{ duration: 600 }}
  out:fade={{ duration: 100 }}
  class="fixed top-0 z-[1005] hidden w-full lg:block">
  <div class="flex w-full justify-between px-[2.5rem] pt-[2.38rem]">
    <Cta
      el="button"
      variant="secondary"
      onClick={() => {
        if (typeof window !== 'undefined') window.history.back();
      }}
      className="flex items-center justify-center space-x-[0.5rem] capitalize pt-[0.81rem] pb-[0.88rem] min-w-[7.26375rem]">
      <svg
        width="6"
        height="9.6"
        viewBox="0 0 6 9.6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.18154 4.99995L6 1.26645L4.90923 0.199951L0 4.99995L4.90923 9.79995L6 8.73345L2.18154 4.99995Z"
          fill="currentColor" />
      </svg>
      <span class="leading-tight">{ctas[0].title}</span>
    </Cta>

    {#if !!ctas[1]?.href && !!ctas[1]?.title}
      <Cta
        className="min-w-[8.6875rem] leading-tight py-[0.81rem]"
        target={ctas[1].newTab ? '_blank' : '_self'}
        variant="tertiary"
        href={ctas[1].href}>
        {ctas[1].title}
      </Cta>
    {/if}
  </div>
</nav>
