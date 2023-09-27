<script lang="ts">
  import Cta from '@/components/ui/Cta.svelte';
</script>

<nav class="fixed top-0 z-30 hidden w-full lg:block">
  <div class="flex w-full justify-between px-[2.5rem] pt-[2.38rem]">
    <Cta color="white" href="test" class="flex items-center space-x-[0.5rem]"
      ><svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.18154 4.99995L6 1.26645L4.90923 0.199951L0 4.99995L4.90923 9.79995L6 8.73345L2.18154 4.99995Z"
          fill="white"
        />
      </svg>
      <span> Back </span></Cta
    >

    <Cta variant="fill" href="/" color="red-gray">EXHIBITION</Cta>
  </div>
</nav>
