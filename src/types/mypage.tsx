export type Data = {
  data: User | Gatherings;
  message: string;
  success: boolean;
};

export type User = {
  createdAt: string;
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

export type Reviewable = {
  reviewableCount: 2;
  reviewableList: ReviewableList[];
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
  isCanceled: boolean;
  isClosed: boolean;
  isDeleted?: boolean | null;
  isHearted: boolean;
  isOpened: boolean;
  location: string;
  maxUsers: number;
  participantUsers: number;
  updatedAt: string;
};

export type ReviewableList = {
  category: string;
  createdAt: string;
  gatheringDate: string;
  gatheringId: number;
  gatheringImage: string;
  groupName: string;
  location: string;
  score: number;
  updatedAt: string;
};
