import React from 'react';

const Logo = () => (
  <a onClick={(e) => e.stopPropagation()} style={{ padding: '5px' }} href="/">
    <img src="/icons/artcon-logo.svg" alt="Artcon Logo" />
  </a>
);

export default Logo;
