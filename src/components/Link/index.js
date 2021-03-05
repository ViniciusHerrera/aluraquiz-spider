/* eslint-disable react/prop-types */
import React from 'react';
import NextLink from 'next/link';

export default function Link({ children, href, ...props }) {
  // ...props é um recurso de spreds onde pegamos qualquer coisa que seja passado
  return (
    <NextLink href={href} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a { ...props }>
        {children}
      </a>
    </NextLink>
  );
}
