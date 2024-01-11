<script lang="ts">
  import { cn } from '@/lib/cn';

  export let label: string;
  export let name: string;
  export let value: string;
  export let placeholder: string;
  export let error: string[] | undefined = undefined;
</script>

<div class={cn('flex w-full flex-col space-y-[1rem]', $$props.class)}>
  <label class="text-[1rem] font-semibold" for={name}>{label}</label>
  <div class="relative w-full space-y-[0.5rem]">
    <input
      type="text"
      id={name}
      {name}
      {placeholder}
      bind:value
      class="border-black/10 placeholder:text-black/20 w-full rounded-[8px] border-[1.5px] bg-white/10 px-[16px] py-[12px] placeholder:text-[14px]" />
    {#if !!error}
      <small class="absolute bottom-0 left-0 translate-y-full text-red-600">
        {error}
      </small>
    {/if}
  </div>
</div>
