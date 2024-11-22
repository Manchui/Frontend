export type NickCheckType = {
  data: string;
  message: string;
  success: boolean;
};

export type LoginType = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
};

export type Signuptype = {
  message: string;
  success: boolean;
}