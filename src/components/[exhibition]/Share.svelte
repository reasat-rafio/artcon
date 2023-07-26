<script>
  import ChevronLeftRounded from '../icons/ChevronLeftRounded.svelte';
  import ShareIcon from '../icons/ShareIcon.svelte';
  import H4 from '../ui/H4.svelte';
</script>

<section class="mb-xl border-b border-[#A5A5A8] py-[27px]">
  <div class="container flex">
    <div class="flex flex-1 items-center space-x-[32px]">
      <a class="h-[45px] w-[45px]" href="/exhibition">
        <ChevronLeftRounded />
      </a>
      <H4>Our exhibition</H4>
    </div>
    <button class="h-[28px] w-[27px]">
      <ShareIcon />
    </button>
  </div>
</section>
