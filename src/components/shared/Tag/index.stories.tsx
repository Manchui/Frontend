import type { Meta, StoryObj } from '@storybook/react';

import Index from './index';

const meta = {
  title: 'Components/Tag',
  component: Index,
  tags: ['autodocs'],
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Type: 'default',
    Hour: 10,
    finish: false,
  },
};
