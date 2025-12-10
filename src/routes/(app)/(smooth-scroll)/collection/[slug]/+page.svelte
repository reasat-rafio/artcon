<script lang="ts">
  import { page } from '$app/stores';
  import ImageAsset from '@/components/common/ImageAsset.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Artist from '@/components/pages/[collection]/Artist.svelte';
  import Documentations from '@/components/pages/[collection]/documentations/Documentations.svelte';
  import Summary from '@/components/pages/[collection]/summary/Summary.svelte';
  import Note from '@/components/pages/[exhibition]/Note.svelte';
  import FormPopup from '@/components/widgets/form-popup/FormPopup.svelte';
  import Share from '@/components/widgets/share/Share.svelte';
  import type { CollectionDetailPageProps } from '@/lib/types/collection-detail.types';
  import type { PageProps } from '@/lib/types/common.types';
  import { inquirySchema } from '@/lib/validator';
  import formPopupStore from '@/store/form-popup';
  import { toasts } from 'svelte-toasts';
  import { superForm, type FormResult } from 'sveltekit-superforms/client';
  import type { ActionData } from './$types';

  export let data;

  $: ({
    page: {
      name,
      seo,
      cta,
      asset,
      topTitle,
      subtitle,
      artist,
      sections,
      provenance,
      artworkImages,
      information,
      otherCollections,
      hideInquiryButton,
      slug,
    },
    site: {
      logos: { logoLight, logoDark, ogImage },
      footer,
      contact,
    },
  } = data);

  const f = superForm(data.form, {
    validators: inquirySchema,
    resetForm: true,
    onResult: (event) => {
      const result = event.result as FormResult<ActionData>;

      if (result.type === 'success') {
        formPopupStore.setFormPopupVisibility(false);
        toasts.add({
          description: 'Form submitted successfully',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'success',
        });
      }
    },
  });
</script>

{#key $page.params.slug}
  <Seo {seo} siteOgImg={ogImage} />
  <Hero
    props={{
      asset,
      cta,
      subtitle,
      topTitle,
      _type: 'common.hero',
      title: artist?.name ?? name,
    }} />

  <Share href="/artist" {logoLight} {logoDark}>Our collections</Share>
  <div class="relative z-10 bg-white">
  {#each sections as props}
    {#if props._type === 'common.imageAsset'}
      <ImageAsset {props} />
    {:else if props._type === 'collection.summary' && !!artist}
      <Summary
        props={{
          ...props,
          provenance,
          artworkName: name,
          artworkImages,
          information,
          hideInquiryButton,
          artist: {
            born: artist.born,
            country: artist.country,
            name: artist.name,
          },
        }} />
    {:else if props._type === 'common.note'}
      <Note {props} />
    {:else if props._type === 'collection.artist' && !!artist}
      <Artist props={{ ...props, artist }} />
    {:else if props._type === 'collection.documentation'}
      <Documentations {props} />
    {/if}
  {/each}

    {#if !!otherCollections?.length}
      {#await import('@/components/pages/[collection]/OtherCollection.svelte') then OtherCollection}
        <OtherCollection.default
          title="Other collections"
          data={otherCollections} />
      {/await}
    {/if}
    {#await import('@/components/common/footer/Footer.svelte') then Footer}
      <Footer.default {footer} {contact} logo={logoDark} />
    {/await}
  </div>
{/key}

{#if $formPopupStore.show}
  <FormPopup
    form={f}
    contextMessage={`The user selected collection is titled ${name} by ${artist?.name}.`} />
{/if}
