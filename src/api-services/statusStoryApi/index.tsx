import axiosInstance from "@/src/lib/axiosInstance";

export const createStatuStory = async (data: any) => {
  try {
    const res = await axiosInstance.post("/status/create", data, {
      headers: {
        "Content-Type": "multipart/form-data", // This is important for form data
      },
      transformRequest: () => {
        // Return the form data as it is
        return data;
      },
    });
    console.log(res.data, "createStatuStory");
    return res.data;
  } catch (error) {
    console.error("Error  createStatuStory :", error);
    throw error;
  } 
};

export const getUserStatusStories = async () => {
  try {
    const res = await axiosInstance.get("/status/feed");
    return res.data;
  } catch (error) {
    console.error("getUserStatusStories", error);
    throw error;
  }
};