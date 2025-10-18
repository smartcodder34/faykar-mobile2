import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { commentOnProduct, createProduct, likeProduct } from ".";


export const useCreateProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      router.back();
     
         queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useLikeProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => likeProduct(productId),
    onSuccess: () => {
      // Invalidate and refetch products after successful like
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
    onError: (error) => {
      console.error("Failed to like product:", error);
      // Optionally show error message to user
    },
  });
};

export const useCommentOnProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentOnProduct,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      queryClient.invalidateQueries({ queryKey: ["get-products-comments"] });
    },
    onError(error: any) {},
  });
};
