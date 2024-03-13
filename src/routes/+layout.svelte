<script lang="ts">
  import '@/app.css';
  import PageLoadProgressBar from '@/components/common/PageLoadProgressBar.svelte';
  import uiStore from '@/store/ui';
  import { beforeUpdate, onMount } from 'svelte';

  const asciiArtEdistys = `
  ______    _ _     _                       _
 |  ____|  | (_)   | |                     | |
 | |__   __| |_ ___| |_ _   _ ___        __| | _____   __
 |  __| / _\` | / __| __| | | / __|      / _\` |/ _ \\ \\ / /
 | |___| (_| | \\__ \\ |_| |_| \\__ \\  _  | (_| |  __/\\ V /
 |______\\__,_|_|___/\\__|\\__, |___/ (_)  \\__,_|\\___| \\_/
                         __/ |
                        |___/
`;
  console.log(asciiArtEdistys);

  onMount(() => {
    uiStore.setMobileNavDropdown(false);
  });

  beforeUpdate(() => {
    uiStore.setMobileNavDropdown(false);
  });
</script>

<PageLoadProgressBar />
<slot />
