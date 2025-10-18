import { useQuery } from "@tanstack/react-query";
import {
  getProductComments,
  getProducts,
  getUserProducts,
  likeProduct,
  productCategories,
  subProductCategories,
  viewProduct,
} from ".";

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["get-category"],
    queryFn: productCategories,
  });
};

export const useSubProductCategories = (categoryId: any) => {
  return useQuery({
    queryKey: ["get-sub-category"],
    queryFn: () => subProductCategories(categoryId),
    enabled: !!categoryId, // Only run this query if categoryId is provided
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
  });
};

export const useLikeProducts = () => {
  return useQuery({
    queryKey: ["get-like-products"],
    queryFn: likeProduct,
  });
};

export const useViewProduct = (postId: string) => {
  console.log("postId in query:", postId);
  return useQuery({
    queryKey: ["get-view-product", postId],
    queryFn: () => viewProduct(postId),
  });
};

export const useGetUserProducts = () => {
  return useQuery({
    queryKey: ["get-user-products"],
    queryFn: getUserProducts,
  });
};

// export const useLikeProducts = (postId: string) => {
//   console.log("postId in query:", postId);
//   return useQuery({
//     queryKey: ["get-like-products", postId],
//     queryFn: () => likeProduct(postId),
//   });
// };

export const useGetProductComments = (postId: string) => {
  console.log("postId9999", postId);
  return useQuery({
    queryKey: ["get-products-comments", postId],
    queryFn: () => getProductComments(postId),
  });
};
