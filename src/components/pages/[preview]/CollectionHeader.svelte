<script lang="ts">
  import { getCountryDetails } from '@/lib/helper';
  import { DateTime } from 'luxon';

  export let topic: string;
  export let name: string;
  export let born: string;
  export let country: string;
  export let isAvailable: boolean;
</script>

<section class="mb-[2.5rem] flex flex-col gap-y-[1.94rem]">
  <h2 class="head-6" data-load-animate="y">{topic}</h2>
  <div class="flex justify-between space-x-1 max-lg:flex-col-reverse">
    <header class="space-y-[0.62rem]">
      <div data-load-animate="y">
        <h1 class="head-4 !inline !leading-none">
          {name}
          <span class="head-6 !inline">
            (b. {DateTime.fromISO(born).toFormat('yyyy')})
          </span>
        </h1>
      </div>
      <h4 class="head-8 uppercase" data-load-animate="y">
        {getCountryDetails(country).name}
      </h4>
    </header>
    <span
      class="sub-title-regular lg:title-regular text-quartz-silver border-pigment-red my-[0.5rem] h-fit border-l-[1.5px] pl-[0.81rem] !leading-none">
      {#if isAvailable}
        Available
      {:else}
        Unavailable
      {/if}
    </span>
  </div>
</section>
