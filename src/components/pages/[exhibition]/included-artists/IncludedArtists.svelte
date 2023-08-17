<script lang="ts">
  import type {
    ArtistsProps,
    GroupExhibirtionProps,
    SoloExhibitonProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Summary from '../../[artist]/Summary.svelte';

  export let artists: ArtistsProps;

  let soloExhibition: [SoloExhibitonProps];
  let groupExhibition: GroupExhibirtionProps[];

  if (!!artists?.length) {
    if (artists.length === 1) soloExhibition = artists as [SoloExhibitonProps];
    else groupExhibition = artists as GroupExhibirtionProps[];
  }
</script>

{#if !!soloExhibition?.length}
  <Summary props={soloExhibition[0].data} />
{:else if !!groupExhibition?.length}
  <!--  -->
{/if}
