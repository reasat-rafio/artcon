<script lang="ts">
  import BodyText from './ui/BodyText.svelte';

  export let description: string;
</script>

<article class="grid grid-cols-12">
  <div class="col-span-4">
    <slot />
  </div>

  <BodyText weight="light" class="col-span-8">{description}</BodyText>
</article>
