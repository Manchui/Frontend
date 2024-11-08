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
        profileImagePth: string;
        reviewId: number;
        score: number;
        updatedAt: string;
      }[];
      reviewCount: number;

      scoreList: {
        avgScore: number;
        fiveScoreCount: number;
        fourScoreCount: number;
        oneScoreCount: number;
        threeScoreCount: number;
        twoScoreCount: number;
      };
      totalPage: number;
    };
    message: string;
    success: boolean;
  };
  
  export type GetReviewRequest= {
    category?: string;
    endDate?: string;
    location?: string;
    page: number;
    query?: string;
    size: number;
    sort?: string;
    startDate?: string;
  };
}


