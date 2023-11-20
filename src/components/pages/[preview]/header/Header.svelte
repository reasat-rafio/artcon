<script lang="ts">
  import Info from './Info.svelte';

  export let topic: string;
  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let type: string;
</script>

<section class="mb-[2.25rem] flex flex-col gap-y-[1.5rem] lg:gap-y-[2rem]">
  <h2 class="head-6 !text-[#020202]" data-load-animate="y">{topic}</h2>
  <header>
    <div class="mb-[0.62rem] text-[#1B1B1E]" data-load-animate="y">
      <h1 class="head-4 !inline font-medium !leading-none !text-[#1B1B1E]">
        {title}
      </h1>
      {#if !!subtitle}
        <h3 class="head-6 !inline !leading-none">{' '} / {subtitle}</h3>
      {/if}
    </div>
    <h4 class="head-8 !leading-none" data-load-animate="y">{type}</h4>
  </header>

  <div class="flex flex-col gap-y-[1.5rem]">
    <slot {Info} />
  </div>
</section>
