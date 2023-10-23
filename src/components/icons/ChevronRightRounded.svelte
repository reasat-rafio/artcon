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
  height="46"
  viewBox="0 0 45 46"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M0.5 22.5625C0.5 10.4122 10.3497 0.5625 22.5 0.5625C34.6503 0.5625 44.5 10.4122 44.5 22.5625C44.5 34.7128 34.6503 44.5625 22.5 44.5625C10.3497 44.5625 0.5 34.7128 0.5 22.5625Z"
    stroke={color}
    stroke-opacity="0.36"
  />
  <g clip-path="url(#clip0_396_9915)">
    <path
      d="M23.8182 22.5617L19.9998 26.2952L21.0905 27.3617L25.9998 22.5617L21.0905 17.7617L19.9998 18.8282L23.8182 22.5617Z"
      fill={color}
    />
  </g>
  <defs>
    <clipPath id="clip0_396_9915">
      <rect
        width="6"
        height="13"
        fill={color === 'black' ? 'white' : 'black'}
        transform="translate(19.9998 16.0625)"
      />
    </clipPath>
  </defs>
</svg>
