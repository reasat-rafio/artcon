import { sanityClient } from '@/lib/sanity/sanityClient';
import type { SanityDocument } from '@sanity/client';
import type { SanityReference } from '@sanity/image-url/lib/types/types';
import { useEffect, useMemo, useState } from 'react';
import groq from 'groq';
import { nanoid } from 'nanoid';
import type {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from 'sanity';

type SanityReferenceWKey = SanityReference & { _key: string };

type ArtistsPublication = {
  _id: string;
  publications: null | SanityReferenceWKey[];
}[];

const query = groq`*[_type == "artist" && _id in $artistsIds] {
  _id,
  publications[]
}`;

export function customExibitionAction(
  originalPublishAction: DocumentActionComponent,
): DocumentActionComponent {
  const createRelationShipWithPublicationAndArtistsAction = (
    props: DocumentActionProps,
  ) => {
    const originalResult = originalPublishAction(
      props,
    ) as DocumentActionDescription;

    const [artistsIds, setArtistIds] = useState<string[]>([]);
    const [docPublication, setDocPublicationId] =
      useState<SanityReferenceWKey | null>(null);
    const [initialData, setInitialData] = useState<SanityDocument | null>(null);

    const data = useMemo(
      () => props.draft || props.published,
      [props.draft, props.published],
    );

    useEffect(() => {
      if (props !== null && initialData === null) {
        setInitialData(props.draft || props.published);
      }
    }, [props, initialData]);

    useEffect(() => {
      getArtistId();
    }, [data?.artists]);

    useEffect(() => {
      const publicationRef = data?.publication as SanityReferenceWKey;
      setDocPublicationId(publicationRef);
    }, [data?.publication]);

    const getArtistId = () => {
      const artists = data?.artists as SanityReferenceWKey[];
      if (artists?.length) setArtistIds(() => artists.map((a) => a._ref));
      else setArtistIds([]);
    };

    const checkPublicationChangeState = (): 'added' | 'removed' | undefined => {
      const publicationAdded = !initialData?.publication && !!data?.publication;
      const publicationRemoved =
        !!initialData?.publication && !data?.publication;

      if (publicationAdded) return 'added';
      else if (publicationRemoved) return 'removed';
      else return undefined;
    };

    const getAllSelectedArtistsPublicationsData = async () =>
      (await sanityClient.fetch(query, {
        artistsIds,
      })) as ArtistsPublication;

    const getTheArtistWhoDontHaveThePublication = (
      artistData: ArtistsPublication,
    ) => {
      return artistData.filter((artist) => {
        const hasPublication = !!artist.publications?.some(
          (publication) => publication._ref === docPublication?._ref,
        );
        return hasPublication === false;
      });
    };

    const insertExhibitionsPublicationToArtistsPublications = async (
      artists: ArtistsPublication,
    ) => {
      for (const artist of artists) {
        if (docPublication) {
          let updatedPublications = [{ ...docPublication, _key: nanoid() }];
          if (artist?.publications?.length) {
            updatedPublications = [
              ...artist.publications,
              ...updatedPublications,
            ];
          }
          await sanityClient
            .patch(artist._id)
            .set({ publications: updatedPublications })
            .commit();
        }
      }
    };

    const checkAndCreateArtistsPublications = (data: ArtistsPublication) => {
      try {
        const artistWhoDontHaveThePublication =
          getTheArtistWhoDontHaveThePublication(data);

        if (artistWhoDontHaveThePublication?.length) {
          insertExhibitionsPublicationToArtistsPublications(
            artistWhoDontHaveThePublication,
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      ...originalResult,
      onHandle: async () => {
        const publicationDocState = checkPublicationChangeState();
        const artistsPublicationData =
          await getAllSelectedArtistsPublicationsData();

        if (publicationDocState === 'added') {
          checkAndCreateArtistsPublications(artistsPublicationData);
        } else if (publicationDocState === 'removed') {
          //
        }
        if (originalResult.onHandle) originalResult.onHandle();
      },
    };
  };
  return createRelationShipWithPublicationAndArtistsAction;
}
