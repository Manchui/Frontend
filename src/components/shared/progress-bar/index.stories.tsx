import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './index';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: '색상',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxValue: 100,
    minValue: 10,
    color: 'primary',
  },
};

export const Black: Story = {
  args: {
    maxValue: 27,
    minValue: 10,
    color: 'black',
  },
};
