import axios from "axios";

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
      .get(`users?page=${currentPageNumber}&count=${pageSize}`)
      .then((promise) => promise.data);
  },
  follow(userID: number) {
    return axiosInstance.post(`follow/${userID}`);
  },
  unfollow(userID: number) {
    return axiosInstance.delete(`follow/${userID}`);
  },
};

export const profileAPI = {
  getProfile(userID: number) {
    return axiosInstance.get(`profile/${userID}`);
  },
  getStatus(userID: number) {
    return axiosInstance.get(`profile/status/${userID}`);
  },
  updateStatus(status: string) {
    return axiosInstance.put(`profile/status`, { status });
  },
};

export const authAPI = {
  me() {
    return axiosInstance.get(`auth/me`);
  },
};
