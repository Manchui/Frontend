import type { Meta, StoryObj } from '@storybook/react';

import Index from './index';

const meta = {
  component: Index,
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    buttons: [
      { label: '취소', onClick: () => {} },
      { label: '확인', onClick: () => {} },
    ],
    children: (
      <div className="pt-7 text-center font-semibold">
        <p>정말 나가시겠어요?</p>
        <p>작성된 내용이 모두 삭제됩니다.</p>
      </div>
    ),
  },
};
