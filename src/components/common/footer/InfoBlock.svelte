<script lang="ts">
  import { getSocialIconPath } from '@/lib/helper';
  import type { Type } from '@/lib/types/common.types';
  import { PortableText, toPlainText } from '@portabletext/svelte';
  import type { PortableTextBlock } from 'sanity';
  import { twMerge } from 'tailwind-merge';

  export let type: Type;
  export let info: PortableTextBlock[];
  export let extraLightHeight: boolean = false;
</script>

<div
  class={twMerge(
    'flex space-x-[12px] text-[12px] font-light not-italic tracking-[0.24px]',
    $$props.class,
  )}
>
  <figure>
    <img
      class="h-[0.85938rem] w-[0.85938rem]"
      width="15px"
      height="15px"
      src="/icons/socials/dark/{getSocialIconPath(type)}"
      alt="{type}'s icon"
    />
  </figure>
  <div class:leading-relaxed={extraLightHeight}>
    <PortableText value={info} />
  </div>
</div>
