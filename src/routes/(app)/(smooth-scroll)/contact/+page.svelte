<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Form from '@/components/pages/contact/Form.svelte';
  import type { ActionData } from './$types';
  import { superForm, type FormResult } from 'sveltekit-superforms/client';
  import { contactSchema } from '@/lib/validator';
  import { toasts } from 'svelte-toasts';

  export let data;

  $: ({
    page: { sections, seo },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
    apiKey,
  } = data);

  const f = superForm(data.form, {
    taintedMessage: 'Are you sure you want leave?',
    validators: contactSchema,
    resetForm: true,
    onResult: ({ result }) => {
      console.log('Form result:', result);
      
      if (result.type === 'success') {
        toasts.add({
          description: 'Form submitted successfully',
          duration: 1000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'success',
        });
      } else if (result.type === 'failure') {
        const errorMsg = result.data?.error || 'Failed to submit form';
        toasts.add({
          description: errorMsg,
          duration: 1000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'error',
        });
        console.error('Form submission error:', errorMsg);
      }
    },
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}
<div class="relative z-10 mt-[100dvh] bg-white">
  <div class="pt-section">
    {#each sections as props, index}
      {#if props._type === 'quote'}
        <div class="container-primary pb-section">
          <Quote quote={props} />
        </div>
      {/if}
    {/each}
    <Form form={f} />
  </div>
  <Footer {footer} {contact} logo={logoDark} />
</div>
