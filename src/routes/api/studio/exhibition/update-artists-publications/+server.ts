import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request }) => {
  const { _id, updatedPublications } = await request.json();
  if (!!_id == false || !!updatedPublications === false)
    return json(
      {
        success: false,
        message: 'Missing required input: _id or updatedPublications',
      },
      { status: 403 },
    );

  try {
    await sanityClient
      .patch(_id)
      .set({ publications: updatedPublications })
      .commit();
    return json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return json({ success: false, message: error });
  }
};
