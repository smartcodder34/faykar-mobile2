import axiosInstance from "@/src/lib/axiosInstance";

export const registerUser = async (data: any) => {
    console.log("data66:", data);
  try {
    const res = await axiosInstance.post(`/auth/register`, data);
    return res.data;
  } catch (error) {
    console.error("register User777", error);
    throw error;
  }
};

export const verifyEmail = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/verify-email`, data);
    return res.data;
  } catch (error) {
    console.error("address User Info", error);
    throw error;
  }
};

export const loginUser = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/authenticate`, data);
    return res.data;
  } catch (error) {
    console.error("authenticate User", error);
    throw error;
  }
};


