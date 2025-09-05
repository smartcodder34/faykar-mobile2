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

export const getProfile = async (data: any) => {
  try {
    const res = await axiosInstance.get(`/profile`, data);
    return res.data;
  } catch (error) {
    console.error("getUserApi:", error);
    throw error;
  }
};

export const EditUserDetails = async (data: any) => {
  try {
    const res = await axiosInstance.put(`/profile/update`, data);
    return res.data;
  } catch (error) {
    console.error("EditUserDetails:", error);
    throw error;
  }
};

export const forgotPasswordApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/forgot-password`, data);
    return res.data;
  } catch (error) {
    console.error("fogot PasswordApi", error);
    throw error;
  }
};

export const resetPasswordApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/reset-password`, data);
    return res.data;
  } catch (error) {
    console.error("fogot PasswordApi", error);
    throw error;
  }
};


//social media

export const registerSocialUser = async (payload: any) => {
  try {
    const { data } = await axiosInstance.post("/auth/social-register", payload);
    return data;
  } catch (error) {
    console.error("registerSocialUser", error);
    throw error;
  }
};

export const loginSocialUser = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/social-login`, data);
    return res.data;
  } catch (error) {
     console.error("registerSocialUser", error);
     throw error;
  }
};

