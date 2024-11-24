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
}
