import { create } from "zustand";

const getAllMessage = (set: any) => ({
  chatMessages: null,

  setChatMessages: (data: any) => {
    set((state: any) => ({
      ...state,
      chatMessages: data,
    }));
  },
});

const useGetAllMessage = create(getAllMessage);
export default useGetAllMessage;
