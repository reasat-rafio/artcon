<script lang="ts">
  import { getCountryDetails } from '@/lib/helper';
  import { DateTime } from 'luxon';

  export let topic: string;
  export let name: string;
  export let born: string;
  export let country: string;
  export let isAvailable: boolean;
</script>

<section class="mb-[2.5rem] flex flex-col gap-y-[1.5rem] lg:gap-y-[2rem]">
  <h2 class="preview-h-2" data-load-animate="y">{topic}</h2>
  <div class="flex justify-between space-x-1 max-lg:flex-col-reverse">
    <header class="space-y-[0.3rem]">
      <div data-load-animate="y">
        <h1 class="preview-h-1 !inline !leading-none">
          {name}
          <span class="body-2 font-optiberling-agency font-light">
            b. {DateTime.fromISO(born).toFormat('yyyy')}
          </span>
        </h1>
      </div>
      <h4 class="preview-h-4 uppercase" data-load-animate="y">
        {getCountryDetails(country).name}
      </h4>
    </header>
    <span
      class="sub-title-regular lg:title-regular my-[0.5rem] h-fit border-l-[1.5px] border-[#ED1C24] pl-[0.81rem] !leading-none text-[#4A4A51]">
      {#if isAvailable}
        Available
      {:else}
        Unavailable
      {/if}
    </span>
  </div>
</section>
