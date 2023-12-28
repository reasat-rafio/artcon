<script lang="ts">
  import Info from './Info.svelte';

  export let topic: string;
  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let type: string | undefined = undefined;
</script>

<section class="mb-[2.25rem] flex flex-col gap-y-[1.5rem] lg:gap-y-[2rem]">
  <h3
    class="head-6 mb-2 !normal-case !leading-none !text-rich-black"
    data-load-animate="y">
    {topic}
  </h3>
  <header>
    <div class="mb-[0.62rem] text-eerie-black" data-load-animate="y">
      <h1
        class="head-4 !inline font-medium !leading-[115.5%] !text-eerie-black">
        {title}
      </h1>
      {#if !!subtitle}
        <h2 class="head-6 !inline !leading-none">{' '} / {subtitle}</h2>
      {/if}
    </div>
    {#if !!type}
      <h4 class="head-8 !leading-none text-eerie-black" data-load-animate="y">
        {type}
      </h4>
    {/if}
  </header>

  <div class="flex flex-col gap-y-[1.5rem]">
    <slot {Info} />
  </div>
</section>
