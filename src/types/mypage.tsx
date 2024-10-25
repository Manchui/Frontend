export type Data = {
  data: User | Gatherings;
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
  gatheringList: GatheringList[];
  page: number;
  pageSize: number;
  totalPage: number;
};

export type GatheringList = {
  category: string;
  createdAt: string;
  deletedAt: null;
  dueDate: string;
  gatheringDate: string;
  gatheringId: number;
  gatheringImage: string;
  groupName: string;
  isCancled: boolean;
  isClosed: boolean;
  isDeleted: boolean;
  isHearted: boolean;
  isOpened: boolean;
  location: string;
  maxUsers: number;
  participantUsers: number;
  updatedAt: string;
};
