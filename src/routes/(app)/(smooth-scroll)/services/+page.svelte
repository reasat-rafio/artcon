<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Services from '@/components/pages/services/Services.svelte';
  import FormPopup from '@/components/widgets/form-popup/FormPopup.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ServicesPageProps } from '@/lib/types/services.types';
  import formPopupStore from '@/store/form-popup';
  import type { ActionData } from './$types';
  import { superForm, type FormResult } from 'sveltekit-superforms/client';
  import { inquirySchema } from '@/lib/validator';
  import { toasts } from 'svelte-toasts';

  export let data;
  let {
    page,
    site: {
      logos: { ogImage, logoDark },
      footer,
      contact,
    },
  } = data;

  let contextMessage: string;
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
      } else if (result.type === 'failure') {
        toasts.add({
          description: 'Failed to submit form. Please check your inputs.',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'error',
        });
      }
    },
  });
</script>

<Seo seo={page?.seo} siteOgImg={ogImage} />
{#each page.sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}

<div class="relative z-10 mt-[100dvh] bg-white">
  {#if !!page?.services?.length}
    <Services bind:contextMessage services={page.services} />
  {/if}
  <Footer {footer} {contact} logo={logoDark} />
</div>

{#if $formPopupStore.show}
  <FormPopup form={f} {contextMessage} />
{/if}
