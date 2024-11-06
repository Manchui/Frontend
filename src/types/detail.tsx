export type BaseData = {
  data: DetailData | null;
  message: string;
  success: boolean;
};

export type ReviewsList = {
  reviewContentList: ReviewContentList[];
  reviewCount: number;
  scoreList: ScoreList[];
};

export type ScoreList = {
  '1ScoreCount': number;
  '2ScoreCount': number;
  '3ScoreCount': number;
  '4ScoreCount': number;
  '5ScoreCount': number;
  'avgScore': number;
};

export type ReviewContentList = {
  comment: string;
  createdAt: string;
  gatheringImage: string;
  image: string;
  location: string;
  name: string;
  score: number;
  updatedAt: string;
};

export type UsersList = {
  name: string;
  profileImagePath: string;
};

export type DetailData = {
  category: string;
  content: string;
  createdAt: string;
  currentUsers: number;
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
  reviewsList: ReviewsList;
  updatedAt: string;
  usersList: UsersList[];
};
