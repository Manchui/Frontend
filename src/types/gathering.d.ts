declare module '@manchui-api' {
  export type GetGatheringResponse = {
    data: {
      gatheringCount: number;
      gatheringList: {
        category: Category;
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
        location: Location;
        maxUsers: number;
        minUsers: number;
        name: string;
        opened: boolean;
        profileImage: string;
        updatedAt: string;
      }[];
      page: number;
      pageSize: number;
      totalPage: number;
    };
    message: string;
    success: boolean;
  };
}
