<script lang="ts">
  import Info from './Info.svelte';

  export let topic: string;
  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let type: string;
</script>

<section class="mb-[2.5rem] flex flex-col gap-y-[1.5rem] lg:gap-y-[2rem]">
  <h2 class="preview-h-2" data-load-animate="y">{topic}</h2>
  <header class="space-y-[0.3rem]">
    <div data-load-animate="y">
      <h1 class="preview-h-1 !inline !leading-none">{title}</h1>
      {#if !!subtitle}
        <h3 class="preview-h-3 !inline !leading-none">{' '} / {subtitle}</h3>
      {/if}
    </div>
    <h4 class="preview-h-4" data-load-animate="y">{type}</h4>
  </header>

  <div class="flex flex-col gap-y-[1.5rem] lg:gap-y-[2rem]">
    <slot {Info} />
  </div>
</section>
