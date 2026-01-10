import axiosInstance from "@/src/lib/axiosInstance";

export type RecordLocationPayload = {
  latitude: number | null | undefined;
  longitude: number | null | undefined;
};

export const recordLocationApi = async (payload: RecordLocationPayload) => {
  try {
    const res = await axiosInstance.post(`/profile/record-location`, payload);
    return res.data;
  } catch (error) {
    console.error("recordLocationApi", error);
    throw error;
  }
};
