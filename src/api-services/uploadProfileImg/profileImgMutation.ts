import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { uploadProfileImg } from ".";

export const useUploadProfileImg = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: uploadProfileImg,
    onSuccess(data: any) {
      // showSuccessToast("Successful");
      // showSuccessToast({
      //   message: data.message,
      // });

      console.log("Profile image uploaded successfully:", data);

      //   router.back();
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });
    },
    onError(error: any) {
            handleAxiosError(error);
      
    },
  });
};
