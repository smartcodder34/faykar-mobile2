import { useQuery } from "@tanstack/react-query";
import { getNotificationsApi, markNotificationAsReadApi } from ".";

export const useGetNotificationsApi = () => {
  return useQuery({
    queryKey: ["get-notifications"],
    queryFn: getNotificationsApi,
  });
};


export const useMarkNotificationAsReadApi = (notificationId: any) => {
  console.log("notificationId:", notificationId);
  return useQuery({
    queryKey: ["mark-notification-as-read", notificationId],
    queryFn: () => markNotificationAsReadApi(notificationId),
    enabled: !!notificationId, // Only run this query if notificationId is provided
  });
};











