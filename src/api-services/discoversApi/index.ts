import axiosInstance from "@/src/lib/axiosInstance";


export const discoverProduct = async () => {
  try {
    const res = await axiosInstance.get(`/discovers/product`);
    return res.data;
  } catch (error) {
    console.error("discover Product", error);
    throw error;
  }
};

export const discoverAccount = async () => {
  try {
    const res = await axiosInstance.get(
      `/discovers/account?account_query=codedev85`
    );
    return res.data;
  } catch (error) {
    console.error("discover Account", error);
    throw error;
  }
};

export const discoverCategory = async () => {
  try {
    const res = await axiosInstance.get(
      `/discovers/account?account_query=codedev85`
    );
    return res.data;
  } catch (error) {
    console.error("discover Account", error);
    throw error;
  }
};