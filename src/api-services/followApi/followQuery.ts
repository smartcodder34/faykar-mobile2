import { useQuery } from "@tanstack/react-query";
import { followUserApi, unfollowUserApi } from ".";




export const useFollowUserApi = (userId: any) => {
  return useQuery({
    queryKey: ["follow", userId],
    queryFn: () => followUserApi(userId),
    enabled: !!userId, // Only run this query if userId is provided
  });
};




export const useUnfollowUserApi = (userId: string) => {
  console.log("postId in query:", userId);
  return useQuery({
    queryKey: ["unfollow", userId],
    queryFn: () => unfollowUserApi(userId),
    enabled: !!userId, // Only run this query if userId is provided
  });
};


