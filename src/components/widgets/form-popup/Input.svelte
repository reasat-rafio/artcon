<script lang="ts">
  export let label: string;
  export let name: string;
  export let value: string;
  export let placeholder: string;
  export let error: string[] | undefined;
</script>

<div class="flex w-full flex-col space-y-[16px]">
  <label class="text-[16px] font-semibold" for={name}>{label}</label>
  <div class="w-full space-y-[8px]">
    <input
      type="text"
      id={name}
      {name}
      {placeholder}
      bind:value
      class="border-black/10 placeholder:text-black/20 w-full rounded-[8px] border-[1.5px] bg-white/10 px-[16px] py-[12px] placeholder:text-[14px]" />
    {#if !!error}
      <small class="text-red-600">{error}</small>
    {/if}
  </div>
</div>
