import type { Collection } from '@/lib/types/collection.types';
import type { Documentary } from '@/lib/types/documentary.types';
import type { Event } from '@/lib/types/event.types';
import type { Exhibition } from '@/lib/types/exhibition.types';
import type { Project } from '@/lib/types/project.types';
import type { Publication } from '@/lib/types/publication.types';
import type { Vr } from '@/lib/types/vr.types';

export interface SearchPageProps {
  exhibitions: Exhibition[];
  events: Event[];
  collections: Collection[];
  vrs: Vr[];
  publications: Publication[];
  documentaries: Documentary[];
  projects: Project[];
}
