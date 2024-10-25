import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        {
          name: 'default',
          value: '#F9FAFB',
        },
        {
          name: 'dark',
          value: '#374151',
        },
      ],
      default: 'default',
    },
  },
};

export default preview;
