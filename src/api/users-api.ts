import { axiosInstance, ResponseType } from "./api";
import { PhotosType } from "./profile-api";

type GetUsersResponseType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
export type UserType = {
  id: number;
  name: string;
  status: string | null;
  followed: boolean;
  photos: PhotosType;
};
// TYPES

export const usersAPI = {
  getUsers(currentPageNumber = 1, pageSize = 100) {
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
