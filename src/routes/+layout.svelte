<script lang="ts">
  import '@/app.css';
  import PageLoadProgressBar from '@/components/common/PageLoadProgressBar.svelte';
  import uiStore from '@/store/ui';
  import { beforeUpdate, onMount } from 'svelte';

  onMount(() => {
    uiStore.setMobileNavDropdown(false);
  });

  beforeUpdate(() => {
    uiStore.setMobileNavDropdown(false);
  });
</script>

<PageLoadProgressBar />
<slot />
