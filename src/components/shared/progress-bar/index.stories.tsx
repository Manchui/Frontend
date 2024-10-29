import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './index';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    design: {
      description: '스타일',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxValue: 100,
    value: 47,
    design: 'primary',
  },
};

export const Basics: Story = {
  args: {
    maxValue: 20,
    value: 5,
    design: 'basics',
  },
};

export const Details: Story = {
  args: {
    maxValue: 20,
    value: 17,
    design: 'details',
  },
};

export const Black: Story = {
  args: {
    maxValue: 32,
    value: 27,
    design: 'simple',
  },
};
