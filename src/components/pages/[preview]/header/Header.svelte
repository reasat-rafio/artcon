<script lang="ts">
  import { cn } from '@/lib/cn';
  import Info from './Info.svelte';

  export let topic: string;
  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let type: string | undefined = undefined;
  export let link: string | undefined = undefined;
</script>

<section class="mb-[2.5rem] flex flex-col gap-y-[1.94rem]">
  <h1 class="head-6" data-load-animate="y">
    {topic}
  </h1>

  <div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <header
      data-load-animate="y"
      on:click={() => {
        if (!!link) window.open(link, '_blank');
      }}
      class={cn('mb-[0.62rem] text-eerie-black', {
        'cursor-pointer': !!link,
      })}>
      <h2
        class="head-4 !inline font-medium !leading-[115.5%] !text-eerie-black">
        {title}
      </h2>
      {#if !!subtitle}
        <h3 class="head-6 !inline !leading-none">{' '} / {subtitle}</h3>
      {/if}
    </header>
    {#if !!type}
      <h4 class="head-8 !leading-none text-eerie-black" data-load-animate="y">
        {type}
      </h4>
    {/if}
  </div>

  <div class="flex flex-col gap-y-[1.5rem]">
    <slot {Info} />
  </div>
</section>
