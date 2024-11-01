export interface Main {
  data: MainData;
  message: string;
  success: boolean;
}

export interface MainData {
  gatheringCount: number;
  gatheringList: GatheringListData[];
}

export interface GatheringListData {
  category: string;
  closed: boolean;
  createdAt: string;
  currentUsers: number;
  deletedAt: null;
  dueDate: string;
  gatheringDate: string;
  gatheringId: number;
  gatheringImage: string;
  groupName: string;
  hearted: boolean;
  location: string;
  maxUsers: number;
  minUsers: number;
  name: string;
  opened: boolean;
  profileImage: string;
  updatedAt: string;
}
