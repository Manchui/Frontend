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
          value: '#E5E7EB',
        },
        {
          name: 'dark',
          value: '#1F2937',
        },
      ],
      default: 'default',
    },
  },
};

export default preview;
