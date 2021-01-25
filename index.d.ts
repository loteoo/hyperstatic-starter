declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

import * as React from 'react';

declare module 'react' {
  export interface HTMLAttributes extends React.HTMLAttributes {
    [key: string]: any;
  }
}
