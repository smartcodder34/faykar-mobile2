import axiosInstance from "@/src/lib/axiosInstance";

export const getNotificationsApi = async () => {
  try {
    const res = await axiosInstance.get(`notifications`);
    return res.data;
  } catch (error) {
    console.error("getNotificationsApi", error);
    throw error;
  }
};

export const markNotificationAsReadApi = async (notification_id: any) => {
  try {
    const res = await axiosInstance.get(
      `/notifications/${notification_id}/read`
    );
    return res.data;
  } catch (error) {
    console.error("markNotificationAsReadApi", error);
    throw error;
  }
};


