<script lang="ts">
  import { fade } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  export let name: string;
  export let value: string;
  export let placeholder: string;
  export let error: string[] | undefined;
</script>

<div class={twMerge('relative', $$props.class)}>
  <input
    type="text"
    id={name}
    {name}
    {placeholder}
    bind:value
    class:!border-red-500={!!error?.length}
    class="form bg w-full" />

  {#if !!error}
    <small
      transition:fade
      class="absolute bottom-0 left-0 translate-y-full pl-[calc(1.87rem/2)] text-xs text-red-600">
      {error}
    </small>
  {/if}
</div>

<style lang="postcss">
  .form {
    @apply border-light-gray rounded-[1.25rem] border pb-[1.62rem] pl-[1.87rem] pt-[1.69rem] text-[1rem] leading-[120%];
  }
  .bg {
    background: linear-gradient(
      270deg,
      rgba(29, 29, 37, 0.08) 0%,
      rgba(29, 29, 37, 0.04) 100%
    );
  }
</style>
