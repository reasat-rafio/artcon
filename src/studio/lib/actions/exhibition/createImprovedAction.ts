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
    const [docPublication, setDocPublication] =
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
      setArtistIdAction();
    }, [data?.artists]);

    useEffect(() => {
      setDocPublicationAction();
    }, [data?.publication]);

    const setArtistIdAction = () => {
      const artists = data?.artists as SanityReferenceWKey[];
      if (artists?.length) setArtistIds(() => artists.map((a) => a._ref));
      else setArtistIds([]);
    };

    const setDocPublicationAction = () => {
      const publicationRef = data?.publication as SanityReferenceWKey;
      setDocPublication(publicationRef);
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

    const getArtistPublications = (
      logic: 'have' | 'dont_have',
      artistData: ArtistsPublication,
    ) => {
      return artistData.filter((artist) => {
        const hasPublication = !!artist.publications?.some(
          (publication) =>
            publication._ref ===
            (logic === 'have'
              ? initialData?.publication?._ref
              : docPublication?._ref),
        );
        return logic === 'dont_have'
          ? hasPublication === false
          : hasPublication;
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

    const removeExhibitionsPublicationToArtistsPublications = async (
      artists: ArtistsPublication,
    ) => {
      for (const artist of artists) {
        if (initialData?.publication) {
          const removedPublicationRef =
            initialData.publication as SanityReferenceWKey;

          if (artist?.publications?.length) {
            const updatedPublications = artist.publications.filter(
              (e) => e._ref !== removedPublicationRef._ref,
            );

            await sanityClient
              .patch(artist._id)
              .set({ publications: updatedPublications })
              .commit();
          }
        }
      }
    };

    const checkAndCreateArtistsPublications = async (
      data: ArtistsPublication,
    ) => {
      try {
        const artistWhoDontHaveThePublication = getArtistPublications(
          'dont_have',
          data,
        );

        if (artistWhoDontHaveThePublication?.length) {
          insertExhibitionsPublicationToArtistsPublications(
            artistWhoDontHaveThePublication,
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    const checkAndRemoveArtistsPublications = async (
      data: ArtistsPublication,
    ) => {
      try {
        const artistWhoHaveThePublication = getArtistPublications('have', data);
        console.log(artistWhoHaveThePublication);

        if (artistWhoHaveThePublication?.length) {
          removeExhibitionsPublicationToArtistsPublications(
            artistWhoHaveThePublication,
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
          checkAndRemoveArtistsPublications(artistsPublicationData);
        }
        console.log(publicationDocState);

        if (originalResult.onHandle) originalResult.onHandle();

        setInitialData(data);
      },
    };
  };
  return createRelationShipWithPublicationAndArtistsAction;
}
