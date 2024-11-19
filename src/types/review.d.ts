declare module '@manchui-api' {
  export type GetReviewResponse = {
    data: {
      page: number;
      pageSize: number;
      reviewContentList: {
        category: string;
        comment: string;
        createdAt: string;
        gatheringId: number;
        gatheringImage: string;
        groupName: string;
        location: string;
        name: string;
        profileImagePath: string;
        reviewId: number;
        score: number;
        updatedAt: string;
      }[];
      reviewCount: number;
      scoreList: {
        '1ScoreCount': number;
        '2ScoreCount': number;
        '3ScoreCount': number;
        '4ScoreCount': number;
        '5ScoreCount': number;
       
      };
      totalPage: number;
    };
    message: string;
    success: boolean;
  };

  export type GetReviewRequest = {
    category?: string;
    endDate?: string;
    location?: string;
    page?: number;
    query?: string;
    score?: number;
    size: number;
    sort?: string;
    startDate?: string;
  };
}
