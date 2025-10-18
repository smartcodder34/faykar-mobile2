import axiosInstance from "@/src/lib/axiosInstance";

export const createProduct = async (data: any) => {
  try {
    const res = await axiosInstance.post("/product/create", data, {
      headers: {
        "Content-Type": "multipart/form-data", // This is important for form data
      },
      transformRequest: () => {
        // Return the form data as it is
        return data;
      },
    });
    console.log(res.data, "createProduct");
    return res.data;
  } catch (error) {
    console.error("Error create Product :", error);
    throw error;
  }
};

export const productCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories");
    return res.data;
  } catch (error) {
    console.error("product Categories", error);
    throw error;
  }
};

export const subProductCategories = async (data: any) => {
  try {
    const res = await axiosInstance.get(`/subcategories/${data}`);
    return res.data;
  } catch (error) {
    console.error("sub product Categories", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const res = await axiosInstance.get(`/product/all/products`);
    return res.data;
  } catch (error) {
    console.error("get product", error);
    throw error;
  }
};

export const getUserProducts = async () => {
  try {
    const res = await axiosInstance.get(`/product/customers/product`);
    return res.data;
  } catch (error) {
    console.error("get product", error);
    throw error;
  }
};

export const likeProduct = async (data: any) => {
  try {
    const res = await axiosInstance.get(`/product/${data}/like`);
    return res.data;
  } catch (error) {
    console.error("likeProduct", error);
    throw error;
  }
};

export const viewProduct = async (dataId: string) => {
  try {
    const res = await axiosInstance.get(`/product/${dataId}`);
    return res.data;
  } catch (error) {
    console.error("viewProduct ", error);
    throw error;
  }
};

export const getProductComments = async (data: string) => {
  console.log("data22222", data);
  try {
    const res = await axiosInstance.get(`comments/all/${data}`);
    return res.data;
  } catch (error) {
    console.error("getProductComments", error);
    throw error;
  }
};

export const commentOnProduct = async (data: any) => {
  console.log("postId234 in api:", data);
  const requestedPayload = {
    body: data.comment,
  };
  try {
    const res = await axiosInstance.post(
      `comments/${data.product_id}`,
      requestedPayload
    );
    return res.data;
  } catch (error) {
    console.error("commentOnProduct", error);
    throw error;
  }
};
