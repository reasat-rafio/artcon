import type { SearchPageProps } from '@/lib/types/search.types';
import { writable } from 'svelte/store';

type SearchStore = {
  data: SearchPageProps | null;
};

const createSearchStore = () => {
  const { subscribe, update } = writable<SearchStore>({
    data: null,
  });

  const setData = (data: SearchPageProps) => {
    update(($store) => {
      $store.data = data;
      return $store;
    });
  };

  return {
    subscribe,
    setData,
  };
};

const searchStore = createSearchStore();

export default searchStore;
