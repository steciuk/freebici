import { ReactElement, ReactPortal } from 'react';

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

export type Children =
  | ReactChild
  | Array<Children>
  | ReactPortal
  | boolean
  | null
  | undefined;
