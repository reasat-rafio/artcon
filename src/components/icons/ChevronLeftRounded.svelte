<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let color: 'black' | 'white' = 'black';
</script>

<svg
  class={twMerge(
    'transition-transform duration-500 hover:scale-105',
    $$props.class,
  )}
  width="45"
  height="45"
  viewBox="0 0 45 45"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M0.5 22.5C0.5 10.3497 10.3497 0.5 22.5 0.5C34.6503 0.5 44.5 10.3497 44.5 22.5C44.5 34.6503 34.6503 44.5 22.5 44.5C10.3497 44.5 0.5 34.6503 0.5 22.5Z"
    stroke={color}
    stroke-opacity="0.36" />
  <g clip-path="url(#clip0_552_413)">
    <path
      d="M22.1813 22.4998L25.9998 18.7663L24.909 17.6998L19.9998 22.4998L24.909 27.2998L25.9998 26.2333L22.1813 22.4998Z"
      fill={color} />
  </g>
  <defs>
    <clipPath id="clip0_552_413">
      <rect
        width="6"
        height="13"
        fill={color === 'black' ? 'white' : 'black'}
        transform="matrix(-1 0 0 -1 25.9998 29)" />
    </clipPath>
  </defs>
</svg>
