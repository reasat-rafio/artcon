<script lang="ts">
  import Info from './Info.svelte';

  export let topic: string;
  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let type: string | undefined = undefined;
</script>

<section class="mb-[2.25rem] flex flex-col gap-y-[1.5rem] lg:gap-y-[2rem]">
  <h1
    class="head-6 !normal-case !leading-none !text-rich-black"
    data-load-animate="y">
    {topic}
  </h1>
  <header>
    <div class="mb-[0.62rem] text-eerie-black" data-load-animate="y">
      <h2
        class="head-4 !inline font-medium !leading-[115.5%] !text-eerie-black">
        {title}
      </h2>
      {#if !!subtitle}
        <h3 class="head-6 !inline !leading-none">{' '} / {subtitle}</h3>
      {/if}
    </div>
    {#if !!type}
      <h4 class="head-8 !leading-none" data-load-animate="y">{type}</h4>
    {/if}
  </header>

  <div class="flex flex-col gap-y-[1.5rem]">
    <slot {Info} />
  </div>
</section>
