import { raf } from '@/utils/tempus';
import { onMount } from 'svelte';

export function useFrame(callback: (...args: any[]) => void, priority = 0) {
  onMount(() => {
    if (callback) {
      raf.add(callback, priority);

      return () => raf.remove(callback);
    }
  });
}
