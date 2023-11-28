import type { SearchPageProps } from '@/lib/types/search.types';
import { writable } from 'svelte/store';

type SearchStore = {
  data: SearchPageProps | null;
  loading: boolean;
};

const createSearchStore = () => {
  const { subscribe, update } = writable<SearchStore>({
    data: null,
    loading: false,
  });

  const setData = (data: SearchPageProps) => {
    update(($store) => {
      $store.data = data;
      return $store;
    });
  };

  const setLoading = (loading: boolean) => {
    update(($store) => {
      $store.loading = loading;
      return $store;
    });
  };

  return {
    subscribe,
    setData,
    setLoading,
  };
};

const searchStore = createSearchStore();

export default searchStore;
