<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { fade, scale } from 'svelte/transition';
  import { collectionDropdownOptions } from '@/lib/constant';

  $: activeSortParams = $page.url.searchParams.get('sort');
  let showDropDown = false;

  const handleDropdownFocusLoss = ({
    relatedTarget,
    currentTarget,
  }: FocusEvent & {
    currentTarget: EventTarget & HTMLButtonElement;
  }) => {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return;
    showDropDown = false;
  };

  const setSearchParams = (value: string) => {
    const searchParams = new URLSearchParams($page.url.searchParams.toString());
    searchParams.set('sort', value);

    goto($page.url.pathname + '?' + searchParams.toString(), {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

<div class="relative hidden h-max lg:block">
  <button
    on:click={() => (showDropDown = !showDropDown)}
    on:focusout={handleDropdownFocusLoss}
    class="flex min-w-[8.75rem] items-center justify-center gap-x-[1.29106rem] rounded-2xl border border-quick-silver pb-[0.875rem] pl-[1.6875rem] pr-[1.56431rem] pt-[0.8125rem] text-[0.84375rem] font-medium tracking-[0.01688rem] text-sonic-silver">
    {#key activeSortParams}
      <span class="capitalize" in:fade>{activeSortParams || 'Sort by'}</span>
    {/key}

    {#if activeSortParams}
      <button
        in:scale
        on:click|stopPropagation={() => {
          const searchParams = new URLSearchParams(
            $page.url.searchParams.toString(),
          );
          searchParams.delete('sort');
          goto($page.url.pathname + '?' + searchParams.toString(), {
            replaceState: true,
            noScroll: true,
          });
        }}>
        <svg
          class="text-sonic-silver transition-colors duration-300 hover:text-imperial-red"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
            fill="currentColor" />
        </svg>
      </button>
    {:else}
      <svg
        in:scale
        width="19"
        height="12"
        viewBox="0 0 19 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="button">
        <path
          class="line1"
          d="M0.657227 12H6.76188V10H0.657227V12Z"
          fill="#77777C" />
        <path
          class="line2"
          d="M0.657227 0V2H18.9712V0H0.657227Z"
          fill="#77777C" />
        <path
          class="line3"
          d="M0.657227 7H12.8665V5H0.657227V7Z"
          fill="#77777C" />
      </svg>
    {/if}

    {#if showDropDown}
      <ul
        in:scale={{ duration: 400 }}
        out:scale={{ start: 0.8, duration: 400 }}
        style="box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.10);"
        class="absolute bottom-0 left-1/2 z-god flex w-full -translate-x-1/2 translate-y-full flex-col rounded-[0.5rem] border-light-gray/50 bg-white pb-[0.69rem] pt-[0.63rem]">
        {#each collectionDropdownOptions as { name, value }}
          <li class="sub-title-regular-2">
            <button
              on:click={() => setSearchParams(value)}
              class="w-full origin-left py-[calc(0.62rem/2)] pl-[1.31rem] pr-[1.38rem] text-left transition-colors hover:text-pigment-red">
              {name}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </button>
</div>
