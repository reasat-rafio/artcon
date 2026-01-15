<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Hero from '@/components/common/hero/Hero.svelte';
  import Form from '@/components/pages/contact/Form.svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import { contactSchema } from '@/lib/validator';

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
    <Form form={f} {apiKey} />
  </div>
  <Footer {footer} {contact} logo={logoDark} />
</div>
