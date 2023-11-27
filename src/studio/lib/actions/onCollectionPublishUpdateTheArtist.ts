import { nanoid } from 'nanoid';
import type {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
  Reference,
} from 'sanity';

function findRemovedItems(
  draft: Reference | null,
  published: Reference | null,
) {
  if (!published || !draft || draft._ref !== published._ref) {
    return published;
  }

  return null;
}

const onCollectionPublishUpdateTheArtist = (
  originalPublishAction: DocumentActionComponent,
  context: DocumentActionsContext,
) => {
  const BetterAction = (props: DocumentActionProps) => {
    const originalResult = originalPublishAction(props);
    const client = context.getClient({ apiVersion: '2022-11-29' });

    return {
      ...originalResult,
      onHandle: async () => {
        const { id, draft, published } = props;
        const draftArtist = draft?.artist as Reference;
        const publishedArtist = published?.artist as Reference;

        if (!!draftArtist || !!publishedArtist) {
          const removedArtist = findRemovedItems(draftArtist, publishedArtist);

          if (removedArtist) {
            const removedArtistArtworks: { artworks: Reference[] } =
              await client.fetch(
                `*[_type == 'artist' && _id == $id][0]{artworks}`,
                { id: removedArtist._ref },
              );

            const removedArtistHaveThisArtwork =
              removedArtistArtworks?.artworks?.some((obj) =>
                Object.values(obj).includes(id),
              );

            if (removedArtistHaveThisArtwork) {
              const newArtworkList = removedArtistArtworks?.artworks?.filter(
                (obj) => obj._ref !== id,
              );
              console.log({ newArtworkList });

              try {
                await client
                  .patch(removedArtist._ref)
                  .set({ artworks: newArtworkList })
                  .commit();
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            const artistData: { artworks: Reference[] } = await client.fetch(
              `*[_type == 'artist' && _id == $id][0]{artworks}`,
              { id: draftArtist?._ref },
            );
            const newArtWorkIsPresentInTheArtistDocument =
              artistData?.artworks?.some((obj) =>
                Object.values(obj).includes(draftArtist._key),
              );
            if (!newArtWorkIsPresentInTheArtistDocument) {
              await client
                .patch(draftArtist._ref)
                .setIfMissing({ artworks: [] })
                .append('artworks', [
                  { _key: nanoid(), _type: 'reference', _ref: id },
                ])
                .commit();
            }
          }
        }

        if (originalResult?.onHandle) originalResult.onHandle();
      },
    };
  };
  return BetterAction as DocumentActionComponent;
};

export default onCollectionPublishUpdateTheArtist;
