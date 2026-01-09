import axiosInstance from "@/src/lib/axiosInstance";

export const followUserApi = async (userId: any) => {
  try {
    const res = await axiosInstance.get(`/follow/${userId}`);
    return res.data;
  } catch (error) {
    console.error("followUserApi", error);
    throw error;
  }
};

export const unfollowUserApi = async (userId: any) => {
  try {
    const res = await axiosInstance.get(`/unfollow/${userId}`);
    return res.data;
  } catch (error) {
    console.error("unfollowUserApi", error);
    throw error;
  }
};

export const fetchFollowerApi = async () => {
  try {
    const res = await axiosInstance.get(`/fetch-followers`);
    return res.data;
  } catch (error) {
    console.error("fetchFollowerApi", error);
    throw error;
  }
};
