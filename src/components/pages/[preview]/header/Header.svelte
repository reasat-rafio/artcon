<script lang="ts">
  import Info from './Info.svelte';

  export let topic: string;
  export let title: string;
  export let subtitle: string;
  export let type: string;
</script>

<section class="mb-[2.5rem]">
  <h2 class="preview-h-2" data-load-animate="y">{topic}</h2>
  <header class="space-y-[0.625rem] pt-[1rem] lg:pt-[1.25rem]">
    <div data-load-animate="y">
      <h1 class="preview-h-1 inline">{title}</h1>
      <h3 class="preview-h-3 inline">{' '} / {subtitle}</h3>
    </div>
    <h4 class="preview-h-4" data-load-animate="y">{type}</h4>
  </header>

  <slot {Info} />
</section>
