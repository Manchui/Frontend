declare module '@manchui-api' {
  export type GetCloseGatheringResponse = {
    data: {
      closedGatheringList: {
        gatheringId: number;
        groupName: string;
      };
      gatheringCount: number;
    };

    message: string;
    success: boolean;
  };
  export type GetCloseGatheringIdResponse = {
    data: {
      category: string;
      content: string;
      gatheringId: number;
      gatheringImage: string;
      groupName: string;
      location: string;
      maxUsers: number;
      minUsers: number;
    };

    message: string;
    success: boolean;
  };
}
