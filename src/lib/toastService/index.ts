// src/lib/toastService/index.ts
import Toast from "react-native-toast-message";

export interface ToastOptions {
  type?: "success" | "error" | "info" | "warning";
  title?: string;
  message?: string;
  duration?: number;
  position?: "top" | "bottom";
  topOffset?: number;
  bottomOffset?: number;
}

class ToastService {
  /**
   * Show success toast
   */
  static success(
    message: string,
    title?: string,
    options?: Omit<ToastOptions, "type">
  ) {
    Toast.show({
      type: "success",
      text1: title || "Success",
      text2: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
      ...options,
    });
  }

  /**
   * Show error toast
   */
  static error(
    message: string,
    title?: string,
    options?: Omit<ToastOptions, "type">
  ) {
    Toast.show({
      type: "error",
      text1: title || "Error",
      text2: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
      ...options,
    });
  }

  /**
   * Show info toast
   */
  static info(
    message: string,
    title?: string,
    options?: Omit<ToastOptions, "type">
  ) {
    Toast.show({
      type: "info",
      text1: title || "Info",
      text2: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
      ...options,
    });
  }

  /**
   * Show warning toast
   */
  static warning(
    message: string,
    title?: string,
    options?: Omit<ToastOptions, "type">
  ) {
    Toast.show({
      type: "info", // react-native-toast-message doesn't have warning type by default
      text1: title || "Warning",
      text2: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
      ...options,
    });
  }

  /**
   * Show custom toast
   */
  static custom(options: ToastOptions & { type: string }) {
    Toast.show({
      text1: options.title,
      text2: options.message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
      ...options,
    });
  }

  /**
   * Hide current toast
   */
  static hide() {
    Toast.hide();
  }
}

export default ToastService;
