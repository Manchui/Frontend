export type Data = {
  data: User;
  message: string;
  success: boolean;
};

export type User = {
  email: string;
  id: string;
  image: string;
  name: string;
};

export type Gatherings = {
  gatheringCount: number;
  gatheringList: [
    {
      category: string;
      createdAt: '2024-10-16 14:36:31';
      deletedAt: null;
      dueDate: '2024-10-22 23:59:59';
      gatheringDate: '2024-10-24 19:30:00';
      gatheringId: number;
      gatheringImage: string;
      groupName: string;
      isCancled: boolean;
      isClosed: boolean;
      isHearted: boolean;
      isOpened: boolean;
      location: string;
      maxUsers: number;
      participantUsers: number;
      updatedAt: '2024-10-16 14:36:31';
    },
  ];
  page: number;
  pageSize: number;
  totalPage: number;
};
