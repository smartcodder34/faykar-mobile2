import { useMutation, useQueryClient } from "@tanstack/react-query";
import { discoverFilterCategory } from ".";

export const useDiscoverCategoryMutation = (handleFilterApplied:()=>void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => discoverFilterCategory(data),
    onSuccess: (data) => {
      // Invalidate and refetch products after successful like
      // queryClient.invalidateQueries({ queryKey: ["get-products"] });
      console.log(data, "from-the");
      handleFilterApplied()
    },
    onError: (error) => {
      console.error("Failed to like product:", error);
      // Optionally show error message to user
    },
  });
};


