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

export const discoverFilterCategory = async (data: any) => {
  console.log(data, "databbb");
  const payload = {
    title: data.category?.title || data?.title,
    categoryId: data.category?.value || data?.value,
    min: data.minPrice,
    max: data.maxPrice,
    lat: data.location.latitude.toString(),
    long: data.location.longitude.toString(),
  };
  console.log("payload300", payload);
  try {
    const res = await axiosInstance.get(
      `/discovers/category?term=${payload?.title}&min_price=${payload.min}&max_price=${payload.max}&latitude=${payload.lat}&longitude=${payload.long}&category_id=${payload?.categoryId}`
    );
    return res.data;
  } catch (error) {
    console.error("discover catagory", error);
    throw error;
  }
};

export const discoverCategory = async (data: any) => {
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

export const discoverAccount = async (data: string) => {
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
