import { useQuery } from "@tanstack/react-query";
import { discoverAccount, discoverCategory, discoverProduct, popularSearched, recentlySearched } from ".";

export const useDiscoverProduct = () => {
  return useQuery({
    queryKey: ["discover-product"],
    queryFn: discoverProduct,
  });
};

export const useDiscoverAccount = (acct:string) => {
  return useQuery({
    queryKey: ["discover-Account", acct],
    queryFn: () => discoverAccount(acct),
    enabled: !!acct,
  });
};

export const useRecentlySearched = () => {
  return useQuery({
    queryKey: ["discover-search"],
    queryFn: recentlySearched,
  });
};

export const usePopularSearched = () => {
  return useQuery({
    queryKey: ["popular-search"],
    queryFn: popularSearched,
  });
};


export const useDiscoverCategory = (data:any) => {
  console.log("data2000", data)
  return useQuery({
    queryKey: ["popular-category"],
    queryFn:()=> discoverCategory(data),
  });
};




