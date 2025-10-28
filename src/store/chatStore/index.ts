import { create } from "zustand";

const getAllMessage = (set: any) => ({
 
  chatMessages:[],

  setChatMessages: (data: any) => {
    set((state: any) => ({
      ...state,
      chatMessages: [...state.chatMessages, ...data],
    }));
  },
});

const useGetAllMessage = create(getAllMessage);
export default useGetAllMessage;
