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

export const discoverCategory = async (data:any) => {
  console.log(data, "databbb");
  try {
    const res = await axiosInstance.get(
      `/discovers/category?term=${data.title}&category_id=${data.value}`
    );
    return res.data;
  } catch (error) {
    console.error("discover catagory", error);
    throw error;
  }
};
// {{APP_URL}}/discovers/:category?term=electronics&category_id=01K65DFRND96GX518C8DD6G4VW
export const discoverAccount = async (data:string) => {
  try {
    const res = await axiosInstance.get(
      `/discovers/accounts?account_query=${data}`
    );
    return res.data;
  } catch (error) {
    console.error("discover Account", error);
    throw error;
  }
};

export const recentlySearched = async () => {
  try {
    const res = await axiosInstance.get(`/discovers/recently/searched`);
    return res.data;
  } catch (error) {
    console.error("recently searched", error);
    throw error;
  }
};

export const popularSearched = async () => {
  try {
    const res = await axiosInstance.get(`/discovers/popular/searched`);
    return res.data;
  } catch (error) {
    console.error("popular searched", error);
    throw error;
  }
};