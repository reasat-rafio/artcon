<script lang="ts">
  import type { NavProps } from '@/lib/types/common.types';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import NavItems from './NavItems.svelte';

  export let nav: NavProps;
  export let logo: SanityAsset;
</script>

<nav class="fixed top-0 left-0">navbar</nav>
