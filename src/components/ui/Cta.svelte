<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  class="block w-fit rounded-[64px] border border-sonic-silver/60 px-[27px] py-[14px] text-button font-medium text-sonic-silver"
>
  <slot />
</a>
