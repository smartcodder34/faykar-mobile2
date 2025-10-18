import { create } from "zustand";

const getLocation = (set: any) => ({
  userLocation: {
    user_latitude: 0,
    user_longitude: 0,
    user_address: "",
  },

  setUserLocation: (data: any) => {
    set((state: any) => ({
      ...state,
      userLocation: { ...state.userLocation, ...data },
    }));
  },
});

const useGetLocation = create(getLocation);
export default useGetLocation;
