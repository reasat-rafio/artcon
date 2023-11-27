import type {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
  Reference,
} from 'sanity';

function findRemovedItems(
  draftArray: Reference[] | null,
  publishedArray: Reference[] | null,
) {
  const removedItems = publishedArray?.filter(
    (publishedArtwork) =>
      !draftArray?.some(
        (draftArtwork) => draftArtwork._ref === publishedArtwork._ref,
      ),
  );

  return removedItems;
}

const onArtistPublishUpdateTheCollection = (
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
        const draftArtworks = draft?.artworks as Reference[];
        const publishedArtworks = published?.artworks as Reference[];

        if (draftArtworks?.length || publishedArtworks?.length) {
          const removedArtwork = findRemovedItems(
            draftArtworks,
            publishedArtworks,
          );

          if (removedArtwork?.length) {
            removedArtwork.map(async ({ _ref }) => {
              await client.patch(_ref).unset(['artist']).commit();
            });
          } else {
            draftArtworks.map(async ({ _ref }) => {
              const artworkData: { artist: Reference | null } =
                await client.fetch(
                  `*[_type == 'collection' && _id == $id][0]{artist}`,
                  { id: _ref },
                );

              if (!artworkData?.artist) {
                await client
                  .patch(_ref)
                  .set({
                    artist: { _type: 'reference', _ref: id },
                  })
                  .commit();
              }
            });
          }
        }

        if (originalResult?.onHandle) originalResult.onHandle();
      },
    };
  };
  return BetterAction as DocumentActionComponent;
};

export default onArtistPublishUpdateTheCollection;
