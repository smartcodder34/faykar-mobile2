


import * as Location from "expo-location";
import { useEffect, useState } from "react";

type LocationType = Location.LocationObject | null;
type AddressType = Location.LocationGeocodedAddress[] | null;

export const useLocation = () => {
  const [location, setLocation] = useState<LocationType>(null);
  const [address, setAddress] = useState<AddressType>(null);
  const [status, setStatus] = useState<
    "loading" | "granted" | "denied" | "error"
  >("loading");

  useEffect(() => {
    (async () => {
      try {
        // Ask permission
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setStatus("denied");
          return;
        }

        setStatus("granted");

        // Get last known location
        let savedLocation = await Location.getLastKnownPositionAsync({});

        if (!savedLocation) {
          // If no saved location, fetch current
          savedLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });
        }

        if (savedLocation) {
          setLocation(savedLocation);

          // Reverse geocode
          const reverseGeoAddress = await Location.reverseGeocodeAsync({
            latitude: savedLocation.coords.latitude,
            longitude: savedLocation.coords.longitude,
          });

          setAddress(reverseGeoAddress);
        }
      } catch (error) {
        console.error("Location error:", error);
        setStatus("error");
      }
    })();
  }, []);

  return { status, location, address };
};
