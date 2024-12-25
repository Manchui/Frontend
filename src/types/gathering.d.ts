declare module '@manchui-api' {
  export type GetBookmarkResponse = {
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
        heartCounts: number;
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
        heartCounts: number;
        hearted: boolean;
        location: Location;
        maxUsers: number;
        minUsers: number;
        name: string;
        opened: boolean;
        profileImage: string;
        updatedAt: string;
      }[];
      nextCursor: number | undefined;
    };
    message: string;
    success: boolean;
  };

  export type GetNotificationResponse = {
    data: NotificationData;
    message: string;
    success: boolean;
  };

  export type NotificationData = {
    nextCursor: number | undefined;
    notificationContent: NotificationContent[];
    notificationCount: number;
  };

  export type NotificationContent = {
    content: string;
    createdAt: Date;
    gatheringId: number;
    isRead: boolean;
    notificationId: number;
    notificationType: 'GATHERING_LIKE' | 'GATHERING_JOIN';
  };
}
