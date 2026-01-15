<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import FormPopup from '@/components/widgets/form-popup/FormPopup.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import { inquirySchema } from '@/lib/validator';
  import formPopupStore from '@/store/form-popup';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;

  $: ({
    page: { seo, privacyPolicy, title },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
    apiKey,
  } = data);

  const f = superForm(data.form, {
    validators: inquirySchema,
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
<div class="container-primary py-[7rem] lg:py-section">
  <DescriptionBlock class="max-lg:mb-section">
    <svelte:fragment slot="intro" let:C>
      <C.Title class="lg:mb-10">{title}</C.Title>
    </svelte:fragment>
    <svelte:fragment slot="description" let:Description>
      <Description>
        <PortableText value={privacyPolicy} />
      </Description>

      <Cta
        el="button"
        onClick={() => formPopupStore.setFormPopupVisibility(true)}
        className="mt-[3.12rem] block border-raisin-black text-raisin-black">
        Contact us
      </Cta>
    </svelte:fragment>
  </DescriptionBlock>
</div>
<Footer {footer} {contact} logo={logoDark} />

{#if $formPopupStore.show}
  <FormPopup
    form={f}
    {apiKey}
    contextMessage={`User pressed "Contact Us" in privacy policy page.`} />
{/if}
