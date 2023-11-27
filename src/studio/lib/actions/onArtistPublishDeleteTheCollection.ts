import type {
  DocumentActionComponent,
  DocumentActionProps,
  // DocumentActionsContext,
  // Reference,
} from 'sanity';

const onArtistPublishDeleteTheCollection = (
  originalPublishAction: DocumentActionComponent,
  // context: DocumentActionsContext,
) => {
  const BetterAction = (props: DocumentActionProps) => {
    const originalResult = originalPublishAction(props);
    // const client = context.getClient({ apiVersion: '2022-11-29' });

    return {
      ...originalResult,
      onHandle: async () => {
        if (originalResult?.onHandle) originalResult.onHandle();
      },
    };
  };
  return BetterAction as DocumentActionComponent;
};

export default onArtistPublishDeleteTheCollection;
