import { useQuery } from "@tanstack/react-query";
import { fetchLocationDetails } from ".";

// const useGetLocationDetails = useQuery({
//   queryKey: ["location-details", city?.place_id],
//   queryFn: () => fetchLocationDetails(city?.place_id),
//   enabled: !!city?.place_id,
// });


export const useGetLocationDetails = (cityId:string) => {
  console.log("postId in query:", cityId);
  return useQuery({
    queryKey: ["location-details", cityId],
    queryFn: () => fetchLocationDetails(cityId),
    // enabled: !!cityId, // Only run this query if userId is provided
  });
};