import React from 'react';

export interface ButtonProps {
  /** Button contents */
  label: string;
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
}

/** Primary UI component for user interaction */
export function Button({ label, ...props }: ButtonProps) {
  return (
    <button type="button" style={{ height: '100px', backgroundColor: '#111827', color: '#E5E7EB', borderRadius: '20px' }} {...props}>
      {label}
    </button>
  );
}
