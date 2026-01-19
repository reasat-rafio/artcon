<script lang="ts">
  import { getSocialIconPath } from '@/lib/helper';
  import type { Type } from '@/lib/types/common.types';

  export let link: string;
  export let type: Type;
</script>

<a href={link} target="_blank" rel="noopener noreferrer">
  <img
    class="h-[1.407rem] w-[1.407rem]"
    width="22.5px"
    height="22.5px"
    src="/icons/socials/ash/{getSocialIconPath(type)}"
    alt="{type}'s icon" />
</a>
