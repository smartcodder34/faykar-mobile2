import { handleAxiosError } from "@/src/lib/handleAxiosError";
import useAuthStore from "@/src/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import {
  EditUserDetails,
  forgotPasswordApi,
  loginSocialUser,
  loginUser,
  registerSocialUser,
  registerUser,
  resetPasswordApi,
  verifyEmail,
} from ".";

// Mutation api call

export const useRegisterUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      router.push("/(auth)/create-account/verification");
    },
    onError(error: any) {
      console.log("error55", error?.response.data.message)
      handleAxiosError(error);
    },
  });
};

export const useVerifyEmail = (handleVerifyBottomSheetOpen: () => void) => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      handleVerifyBottomSheetOpen();
    },
    onError(error: any) {
      handleAxiosError(error);
       Toast.show({
         type: "error",
         text1: error,
       });
      
    },
  });
};

export const useLoginUser = () => {
  const router = useRouter();
  const setIsLoggedIn = useAuthStore().setIsLoggedIn;

  return useMutation({
    mutationFn: loginUser,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      if (data) {
        await AsyncStorage.setItem("token", data.data.access_token.token);
        setIsLoggedIn(true);
        router.push("/(tabs)/homepage");
        console.log("data000:", data);
      }
    },
    onError(error: any) {
      console.log("login error", error.response?.status === 403);
      handleAxiosError(error);
    },
  });
};

export const useForgotPasswordApi = (handleResetPassswordOpen: any) => {
  const router = useRouter();
  return useMutation({
    mutationFn: forgotPasswordApi,
    async onSuccess(data) {
      if (data) {
        handleResetPassswordOpen();
      }
    },
    onError(error) {
      console.log("forgot password error", error);
      handleAxiosError(error);
    },
  });
};

export const useResetPasswordApi = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPasswordApi,
    async onSuccess(data) {
      if (data) {
        router.push("/login");
      }
    },
    onError(error) {
      console.log("Reset password error", error);
      handleAxiosError(error);
    },
  });
};

export const useEditUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EditUserDetails,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      queryClient.invalidateQueries({ queryKey: ["get-profile"] });

    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

//social
export const useRegisterSocialUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerSocialUser,
    async onSuccess(data) {
      console.log("register success data:", data);
      await GoogleSignin.signOut();
      router.push("/login");
    },
    onError(error) {
      handleAxiosError(error);
    },
  });
};



export const useLoginSocialUser = () => {
  const router = useRouter();
  const setIsLoggedIn = useAuthStore().setIsLoggedIn;

  return useMutation({
    mutationFn: loginSocialUser,
    async onSuccess(data) {
      if (data) {
      console.log("login success data:", data);

        await AsyncStorage.setItem("token", data.data.access_token.token);
        setIsLoggedIn(true);
        router.push("/(tabs)/homepage");
      }
    },
    onError(error) {
      handleAxiosError(error);
    },
  });
};
