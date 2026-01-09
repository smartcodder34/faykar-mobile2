import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createStatuStory } from ".";

export const useCreateStatusStoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createStatuStory,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      router.back();
      queryClient.invalidateQueries({ queryKey: ["get-status-story"] });
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
    onError(error: any) {},
  });
};





