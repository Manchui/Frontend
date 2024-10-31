export type BaseData = {
  data: DetailData;
  message: string;
  success: boolean;
};

export type ReviewList = {
  comment: string;
  createdAt: string;
  name: string;
  profileImagePath: string;
  score: number;
  userId: string;
};

export type UsersList = {
  profileImagePath: string;
  userId: string;
};

export type DetailData = {
  category: string;
  content: string;
  createdAt: string;
  deletedAt: null;
  dueDate: string;
  gatheringDate: string;
  gatheringId: number;
  gatheringImage: string;
  groupName: string;
  image: string;
  isCanceled: boolean;
  isClosed: boolean;
  isHearted: boolean;
  isOpened: boolean;
  location: string;
  maxUsers: number;
  minUsers: number;
  name: string;
  participantUsers: number;
  reviewList: ReviewList[];
  updatedAt: string;
  usersList: UsersList[];
};
