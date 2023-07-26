<script lang="ts">
  import BodyText from './ui/BodyText.svelte';

  export let description: string;
</script>

<article class="{$$props.class ?? ''} grid grid-cols-12 gap-[98px]">
  <div class="col-span-4">
    <slot />
  </div>

  <BodyText weight="light" class="col-span-8">{description}</BodyText>
</article>
