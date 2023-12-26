import { pagesWithOutSlash } from '@/lib/constant.js';
import { sanityClient } from '@/lib/sanity/sanityClient';
import groq from 'groq';

interface Document {
  name: string;
  slug: string;
  _updatedAt: string;
}

const site = 'https://www.artcon.com.bd';

const query = groq`*[_type == $doc_name][]{
  name,
  "slug": slug.current,
  _updatedAt
}`;

const artistQuery = groq`*[_type == "artist"][]{
  "name": personalDocuments.name.en,
  "slug": slug.current,
  _updatedAt
}`;

type DocumentData = {
  doc_name: string;
  customQuery?: string;
};
const getData = async ({
  doc_name,
  customQuery,
}: DocumentData): Promise<Document[]> => {
  const data = await sanityClient.fetch(customQuery || query, { doc_name });
  return data;
};

type SiteMap = {
  collectionPages: {
    exhibition: Document[];
    artist: Document[];
    collection: Document[];
    event: Document[];
    project: Document[];
  };
  previewPages: {
    'audio-visual': Document[];
    vr: Document[];
    collection: Document[];
    event: Document[];
    exhibition: Document[];
    publication: Document[];
  };
  pages: string[];
};

const previewPagesXml = (previewPages: SiteMap['previewPages']) =>
  Object.keys(previewPages).map((key) =>
    previewPages[key as keyof typeof previewPages]
      .map(
        (item) => `
  <url>
    <loc>${site}/preview/${key}/${item.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${item._updatedAt}</lastmod>
    <priority>0.3</priority>
  </url>
  `,
      )
      .join(''),
  );
const collectionPagesXml = (collectionPages: SiteMap['collectionPages']) =>
  Object.keys(collectionPages).map((key) =>
    collectionPages[key as keyof typeof collectionPages]
      .map(
        (item) => `
  <url>
    <loc>${site}/${key}/${item.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${item._updatedAt}</lastmod>
    <priority>0.3</priority>
  </url>
  `,
      )
      .join(''),
  );

const sitemap = ({
  pages,
  previewPages,
  collectionPages,
}: SiteMap) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${site}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${site}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `,
    )
    .join('')}
    ${previewPagesXml(previewPages).join('')}
    ${collectionPagesXml(collectionPages).join('')}
</urlset>`;

export async function GET({ setHeaders }) {
  setHeaders({
    'cache-control': 'max-age=120',
  });

  const body = sitemap({
    collectionPages: {
      exhibition: await getData({ doc_name: 'exhibition' }),
      artist: await getData({
        doc_name: 'artist',
        customQuery: artistQuery,
      }),
      collection: await getData({ doc_name: 'collection' }),
      event: await getData({ doc_name: 'event' }),
      project: await getData({ doc_name: 'project' }),
    },
    previewPages: {
      'audio-visual': await getData({ doc_name: 'audio-visual' }),
      vr: await getData({ doc_name: 'vr' }),
      collection: await getData({ doc_name: 'collection' }),
      event: await getData({ doc_name: 'event' }),
      exhibition: await getData({ doc_name: 'exhibition' }),
      publication: await getData({ doc_name: 'publication' }),
    },
    pages: pagesWithOutSlash,
  });
  const response = new Response(body);

  response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
  response.headers.set('Content-Type', 'application/xml');
  return response;
}
