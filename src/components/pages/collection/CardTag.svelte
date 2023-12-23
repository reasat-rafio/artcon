<script lang="ts">
  export let displayNew: boolean = false;
  export let displaySold: boolean = false;
</script>

<div
  class="text-alabaster absolute left-0 top-0 z-10 flex h-[2.5rem] w-[2.5rem] -translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full bg-pigment-red text-[0.625rem] font-semibold leading-none sm:-translate-x-1/2 sm:-translate-y-1/2">
  {#if displayNew}
    <span>NEW</span>
  {:else if displaySold}
    <span>SOlD</span>
  {/if}
</div>
