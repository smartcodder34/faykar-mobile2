import axiosInstance from "@/src/lib/axiosInstance";



export const uploadProfileImg = async (data: any) => {
  console.log(data, "data333000");
  try {
    const res = await axiosInstance.post("/profile/upload-profile-img", data, {
      headers: {
        "Content-Type": "multipart/form-data", // This is important for form data
      },
      transformRequest: () => {
        // Return the form data as it is
        return data;
      },
    });
    console.log(res.data, "uploadProfileImg");
    return res.data;
  } catch (error) {
    console.error("Error upload Profile Img :", error);
    throw error;
  }
};