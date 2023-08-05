export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

let lastScrollTime = 0;
export function useDebounce(callback: () => void, cooldownDuration: number) {
  const currentTime = Date.now();
  if (currentTime - lastScrollTime > cooldownDuration) {
    callback();
    lastScrollTime = currentTime;
  }
}

export const zeroPad = (num: number) => {
  return num.toLocaleString().padStart(2, '0');
};
