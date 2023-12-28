<script lang="ts">
  import { cn } from '@/lib/cn';
  import { getSocialIconPath } from '@/lib/helper';
  import type { Type } from '@/lib/types/common.types';
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextBlock } from 'sanity';

  export let type: Type;
  export let info: PortableTextBlock[];
  export let iconStyle: string | undefined = undefined;
</script>

<div
  class={cn(
    'text-subtitle-light flex gap-x-[0.44rem] text-[0.75rem] not-italic',
    $$props.class,
  )}>
  <figure class={iconStyle}>
    <img
      width="20px"
      height="20px"
      class="max-w-[15px] object-contain"
      src="/icons/socials/black/{getSocialIconPath(type)}"
      alt="{type}'s icon" />
  </figure>
  <div class="sub-title-light !leading-normal !text-eerie-black">
    <PortableText components={{}} value={info} />
  </div>
</div>
