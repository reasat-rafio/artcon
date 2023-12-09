<script lang="ts">
  import { getSocialIconPath } from '@/lib/helper';
  import type { Type } from '@/lib/types/common.types';

  export let link: string;
  export let type: Type;
</script>

<a href={link} target="_blank">
  <img
    class="h-[0.938rem] w-[0.938rem]"
    width="15px"
    height="15px"
    src="/icons/socials/ash/{getSocialIconPath(type)}"
    alt="{type}'s icon" />
</a>
