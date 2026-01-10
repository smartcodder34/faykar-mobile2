import { useQuery } from "@tanstack/react-query";
import { getUserStatusStories } from ".";


export const useGetUserStatusStories = () => {
  return useQuery({
    queryKey: ["get-status-story"],
    queryFn: getUserStatusStories,
  });
};














