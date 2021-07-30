import axios from "axios";

export type UserProfileType = {
  aboutMe: string;
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: UserContactsType;
  photos: PhotosType;
};
export type UserType = {
  id: number;
  name: string;
  status: string | null;
  followed: boolean;
  photos: PhotosType;
};
type ResponseType<D = {}> = {
  resultCode: ResultCode;
  messages: Array<string>;
  data: D;
};
type GetMeDataResponseType = {
  id: number;
  email: string;
  login: string;
};
type UserContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
type PhotosType = {
  small: string;
  large: string;
};
type GetUsersResponseType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export enum ResultCode {
  Success = 0,
  Error = 1,
  Captcha = 10,
}

// TYPES

const axiosInstance = axios.create({
  headers: {
    "API-KEY": "264a0581-6cdc-4a28-9b7e-b8b5b1060aa0",
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
});

export const usersAPI = {
  getUsers(currentPageNumber: number = 1, pageSize: number = 100) {
    return axiosInstance
      .get<GetUsersResponseType>(
        `users?page=${currentPageNumber}&count=${pageSize}`
      )
      .then((res) => res.data);
  },
  follow(userID: number) {
    return axiosInstance
      .post<ResponseType>(`follow/${userID}`)
      .then((res) => res.data);
  },
  unfollow(userID: number) {
    return axiosInstance
      .delete<ResponseType>(`follow/${userID}`)
      .then((res) => res.data);
  },
};

export const profileAPI = {
  getProfile(userID: number) {
    return axiosInstance
      .get<UserProfileType>(`profile/${userID}`)
      .then((res) => res.data);
  },
  getStatus(userID: number) {
    return axiosInstance
      .get<string>(`profile/status/${userID}`)
      .then((res) => res.data);
  },
  updateStatus(status: string) {
    return axiosInstance
      .put<ResponseType>(`profile/status`, { status })
      .then((res) => res.data);
  },
};

export const authAPI = {
  me() {
    return axiosInstance
      .get<ResponseType<GetMeDataResponseType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(email: string, password: string, rememberMe?: boolean) {
    return axiosInstance
      .post<ResponseType<{ userId?: number }>>(`/auth/login`, {
        email,
        password,
        rememberMe,
      })
      .then((res) => res.data);
  },
  logout() {
    return axiosInstance
      .delete<ResponseType>(`/auth/login`)
      .then((res) => res.data);
  },
};
