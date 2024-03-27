<script lang="ts">
  import X from '@/components/icons/X.svelte';
  import Cta from '@/components/ui/Cta.svelte';

  import type { Cta as CTAProps } from '@/lib/types/common.types';
  export let cta: CTAProps & { newTab?: boolean };
</script>

<nav
  class="sticky top-0 z-20 flex w-full items-center justify-between bg-white py-[1.18rem] lg:hidden">
  <button
    on:click={() => {
      if (typeof window !== 'undefined') window.history.back();
    }}
    aria-label="Go back to homepage">
    <X class="h-[1.0215rem] w-[1.04394rem]" />
  </button>

  <Cta
    target={cta.newTab ? '_blank' : '_self'}
    variant="tertiary"
    href={cta.href}>
    {cta.title}
  </Cta>
</nav>
