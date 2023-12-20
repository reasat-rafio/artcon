<script lang="ts">
  import { cn } from '@/lib/cn';
  import { fade } from 'svelte/transition';

  export let message: string =
    'It appears there are no items in the selected category, try exploring other options.';
</script>

<div in:fade class={cn('container-primary min-h-[50vh]', $$props.class)}>
  <h2
    class="py-section text-[1rem] font-medium leading-[115.5%] tracking-[0.04rem] text-sonic-silver md:text-[1.5rem] xl:text-[2rem]">
    {message}
  </h2>
</div>
