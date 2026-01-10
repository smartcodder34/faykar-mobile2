import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recordLocationApi, type RecordLocationPayload } from ".";

export const useRecordLocationApi = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, RecordLocationPayload>({
    mutationFn: recordLocationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });

    },
    onError: (error) => {
      console.error("Failed to like product:", error);
    },
  });
};
