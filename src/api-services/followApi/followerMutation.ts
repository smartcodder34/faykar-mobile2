import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUserApi, unfollowUserApi } from ".";

export const useFollowUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => followUserApi(userId),
    onSuccess: () => {
      // Invalidate and refetch products after successful like
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });

    },
    onError: (error) => {
      console.error("Failed to like product:", error);
      // Optionally show error message to user
    },
  });
};

export const useUnFollowUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => unfollowUserApi(userId),
    onSuccess: () => {
      // Invalidate and refetch products after successful like
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });

    },
    onError: (error) => {
      console.error("Failed to like product:", error);
      // Optionally show error message to user
    },
  });
};
