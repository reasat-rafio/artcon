import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../../../../chunks/ssr.js";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { MdLink } from "react-icons/md/index.esm.js";
import { FaRegStar, FaSitemap } from "react-icons/fa/index.esm.js";
import { IoNavigate } from "react-icons/io5/index.esm.js";
const SanityStudio_svelte_svelte_type_style_lang = "";
const css = {
  code: "#svelte-studio.svelte-1nv23gl.svelte-1nv23gl{height:100vh}#svelte-studio.svelte-1nv23gl>div.svelte-1nv23gl{height:100%}",
  map: null
};
const SanityStudio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { config: config2 } = $$props;
  let studioEl;
  if ($$props.config === void 0 && $$bindings.config && config2 !== void 0)
    $$bindings.config(config2);
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1e4mcuv_START --><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots" content="noindex"><meta name="referrer" content="same-origin"><!-- HEAD_svelte-1e4mcuv_END -->`, ""} <div id="svelte-studio" class="svelte-1nv23gl"><div class="svelte-1nv23gl"${add_attribute("this", studioEl, 0)}></div> </div>`;
});
const menuItems = {
  name: "menuItem",
  title: "Menu Item",
  type: "object",
  icon: MdLink,
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "href",
      title: "URL",
      type: "string"
    },
    {
      name: "highlight",
      title: "Highlight",
      type: "boolean"
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href"
    }
  }
};
const pages = [];
const seo = {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "description",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "ogImage",
      type: "image",
      options: {
        accept: "image/png, image/jpeg, image/webp"
      }
    }
  ]
};
const logos = {
  name: "site.logos",
  title: "Logos",
  type: "document",
  icon: FaRegStar,
  fields: [
    {
      name: "logo",
      type: "image",
      validation: (Rule) => Rule.required()
    },
    {
      name: "mobileLogo",
      type: "image",
      validation: (Rule) => Rule.required()
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "image",
      validation: (Rule) => Rule.required()
    },
    {
      name: "ogImage",
      title: "Default SEO Image",
      type: "image",
      options: {
        accept: "image/png, image/jpeg, image/webp"
      },
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    prepare: () => ({
      title: "Logos"
    })
  }
};
const navigations = {
  name: "site.nav",
  title: "Navigation",
  type: "document",
  icon: IoNavigate,
  fields: [
    {
      name: "menu",
      title: "Menu",
      type: "array",
      of: [{ type: "menuItem" }],
      validation: (Rule) => Rule.required().custom((content) => {
        const highlightedMenuItems = (content || []).filter(
          ({ highlight }) => highlight
        );
        return highlightedMenuItems.length > 1 ? {
          message: "There can only be one highlighted menu item. Please delete the extra ones."
        } : true;
      })
    }
  ],
  preview: {
    prepare: () => ({
      title: "Navigations"
    })
  }
};
const site = [logos, navigations];
const schemaTypes = [...site, ...pages, seo, menuItems];
const singleItem = (S, { schemaType, id, title, icon }) => S.listItem({ schemaType, title, id, icon }).child(
  S.editor().id(id).title(title).schemaType(schemaType)
);
const AppStructure = (S) => S.list().title("Content").id("__root__").items([
  S.listItem().title("Site").icon(FaSitemap).child(
    S.list().title("Site").items([
      singleItem(S, {
        schemaType: "site.logos",
        id: "siteLogos",
        title: "Logos"
      }),
      singleItem(S, {
        schemaType: "site.nav",
        id: "siteNav",
        title: "Navigation"
      })
    ])
  )
]);
const config = defineConfig([
  {
    name: "artcon-production-workspace",
    title: "Production ",
    projectId: "fjt1fjyt",
    dataset: "production",
    basePath: "/studio/production",
    plugins: [deskTool({ structure: AppStructure }), visionTool()],
    schema: {
      types: schemaTypes
    }
  },
  {
    name: "artcon-production-staging",
    title: "Staging ",
    projectId: "fjt1fjyt",
    dataset: "production",
    basePath: "/studio/staging",
    plugins: [deskTool({ structure: AppStructure }), visionTool()],
    schema: {
      types: schemaTypes
    }
  }
]);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SanityStudio, "SanityStudio").$$render($$result, { config }, {}, {})}`;
});
export {
  Page as default
};
