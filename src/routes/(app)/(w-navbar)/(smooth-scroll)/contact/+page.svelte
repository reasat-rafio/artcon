<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Form from '@/components/pages/contact/Form.svelte';
  import type { ActionData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import { contactSchema } from '@/lib/validator';

  export let data;
  export let form: ActionData;

  $: ({
    page: { sections, seo },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
  } = data);

  const f = superForm(data.form, {
    taintedMessage: 'Are you sure you want leave?',
    validators: contactSchema,
    resetForm: true,
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as s}
  {#if s._type === 'common.hero'}
    <Hero props={s} />
  {/if}
{/each}
<div class="relative mt-[100vh] bg-white">
  <div class="py-section">
    {#each sections as props}
      {#if props._type === 'quote'}
        <div class="container-primary pb-section">
          <Quote quote={props} />
        </div>
      {/if}
    {/each}
    <Form form={f} formMessage={form?.formMessage} />
  </div>
  <Footer {footer} {contact} logo={logoDark} />
</div>
