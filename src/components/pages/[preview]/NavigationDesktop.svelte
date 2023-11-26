<script lang="ts">
  import type { Cta as CTAProps } from '@/lib/types/common.types';

  import Cta from '@/components/ui/Cta.svelte';

  type CTA = CTAProps & { newTab?: boolean };
  export let ctas: [CTA, CTA];
</script>

<nav class="fixed top-0 z-[1001] hidden w-full lg:block">
  <div class="flex w-full justify-between px-[2.5rem] pt-[2.38rem]">
    <Cta
      variant="secondary"
      href={ctas[0].href}
      className="flex items-center justify-center space-x-[0.5rem]">
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.18154 4.99995L6 1.26645L4.90923 0.199951L0 4.99995L4.90923 9.79995L6 8.73345L2.18154 4.99995Z"
          fill="currentColor" />
      </svg>
      <span>{ctas[0].title}</span>
    </Cta>

    <Cta
      target={ctas[1].newTab ? '_blank' : '_self'}
      variant="tertiary"
      href={ctas[1].href}>
      {ctas[1].title}
    </Cta>
  </div>
</nav>
