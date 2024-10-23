import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼 안에 들어갈 문자',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButton: Story = {
  args: {
    variant: 'white',
    label: 'There is a button',
    size: 'primary',
  },
};

export const SmallButton: Story = {
  args: {
    variant: 'primary',
    label: '생성하기',
    size: 'small',
  },
};

export const LargeButton: Story = {
  args: {
    variant: 'danger',
    label: '생성하기',
    size: 'large',
  },
};
