<script lang="ts">
  import { cn } from '@/lib/cn';
  import { getSocialIconPath } from '@/lib/helper';
  import type { Type } from '@/lib/types/common.types';
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextBlock } from 'sanity';

  export let type: Type;
  export let info: PortableTextBlock[];
</script>

<div
  class={cn(
    'text-subtitle-light flex gap-x-[0.44rem] text-[0.75rem] not-italic',
    $$props.class,
  )}>
  <figure>
    <img
      width="15px"
      height="15px"
      class="h-[1rem] w-[1rem]"
      src="/icons/socials/black/{getSocialIconPath(type)}"
      alt="{type}'s icon" />
  </figure>
  <div class="sub-title-light !leading-normal !text-[#1B1B1E]">
    <PortableText value={info} />
  </div>
</div>
