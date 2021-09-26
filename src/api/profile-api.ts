import { axiosInstance, ResponseType } from "./api";

export type UserProfileType = {
  aboutMe: string;
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ProfileContactsType;
  photos: PhotosType;
};
export type ProfileContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type PhotosType = {
  small: string;
  large: string;
};
// TYPES

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
  updatePhoto(image: File) {
    const formData = new FormData();
    formData.append("image", image); // creating formData object to send file to server

    return axiosInstance
      .put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, // configuring specific headers for the file sent
      })
      .then((res) => res.data);
  },
};
