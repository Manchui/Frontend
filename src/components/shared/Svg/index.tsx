import type { PropsWithChildren, SVGProps } from 'react';

export type Props = SVGProps<SVGSVGElement>;

export function Svg({ children, width, height, viewBox, ...rest }: PropsWithChildren<Props>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width ?? 24} height={height ?? 24} viewBox={viewBox ?? '0 0 24 24'} {...rest}>
      {children}
    </svg>
  );
}
