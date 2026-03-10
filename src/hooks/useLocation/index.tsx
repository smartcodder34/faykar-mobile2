


import * as Location from "expo-location";
import { useEffect, useState } from "react";

type LocationType = Location.LocationObject | null;
type AddressType = Location.LocationGeocodedAddress[] | null;

const MINIMUM_ACCEPTABLE_ACCURACY = 100; // meters

export const useLocation = () => {
  const [location, setLocation] = useState<LocationType>(null);
  const [address, setAddress] = useState<AddressType>(null);
  const [status, setStatus] = useState<
    "loading" | "granted" | "denied" | "error"
  >("loading");
  const [accuracy, setAccuracy] = useState<number | null>(null);

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

        // Get current position with high accuracy (prioritize fresh location)
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        // Check if location accuracy is acceptable
        const currentAccuracy = currentLocation.coords.accuracy ?? Infinity;
        if (currentAccuracy <= MINIMUM_ACCEPTABLE_ACCURACY) {
          setLocation(currentLocation);
          setAccuracy(currentAccuracy);

          // Reverse geocode
          const reverseGeoAddress = await Location.reverseGeocodeAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });

          setAddress(reverseGeoAddress);
        } else {
          // Try getting last known location if current is not accurate enough
          const savedLocation = await Location.getLastKnownPositionAsync({});

          const savedAccuracy = savedLocation?.coords.accuracy ?? Infinity;
          if (
            savedLocation &&
            savedAccuracy <= MINIMUM_ACCEPTABLE_ACCURACY
          ) {
            setLocation(savedLocation);
            setAccuracy(savedAccuracy);

            const reverseGeoAddress = await Location.reverseGeocodeAsync({
              latitude: savedLocation.coords.latitude,
              longitude: savedLocation.coords.longitude,
            });

            setAddress(reverseGeoAddress);
          } else {
            // Use current location anyway if no better option
            setLocation(currentLocation);
            setAccuracy(currentAccuracy);

            const reverseGeoAddress = await Location.reverseGeocodeAsync({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            });

            setAddress(reverseGeoAddress);
          }
        }
      } catch (error) {
        console.error("Location error:", error);
        setStatus("error");
      }
    })();
  }, []);

  return { status, location, address, accuracy };
};
