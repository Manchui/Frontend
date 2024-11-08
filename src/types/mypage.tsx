export type MyPageBaseData = {
  data: Gatherings;
  message: string;
  success: boolean;
};

export type Gatherings = {
  gatheringCount: number;
  page: number;
  pageSize: number;
  participatedGatheringList?: List;
  reviewableList?: List;
  totalPage: number;
  writtenGatheringList?: List;
};

export type List = {
  content: GatheringList[] | ReviewableList[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
};

// TODO: 내가 참여한 모임
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
  isOpened: boolean;
  location: string;
  maxUsers: number;
  name?: string;
  participantUsers: number;
  score: number;
  updatedAt?: string;
};

export type Pageable = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type User = {
  createdAt: string;
  email: string;
  id: string;
  image: string;
  name: string;
};

export type Reviewable = {
  reviewableCount: number;
  reviewableList: ReviewableList[];
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

export type Reviews = {
  data: {
    comment: string;
    gatheringId: number;
    score: number;
  };
  message: string;
  success: boolean;
};
