import type {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
  Reference,
} from 'sanity';

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
        const { draft, id } = props;
        const artworks = draft?.artworks as Reference[];

        if (artworks?.length) {
          artworks.map(async ({ _ref }) => {
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

        if (originalResult?.onHandle) originalResult.onHandle();
      },
    };
  };
  return BetterAction as DocumentActionComponent;
};

export default onArtistPublishUpdateTheCollection;
