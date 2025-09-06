// import { isAxiosError } from "axios";
// import Toast from "react-native-toast-message";



// interface ErrorResponse {
//   message?: string;
//   errors?: Record<string, string[]> | string | string[]; // ← added string[]
//   error?: string;
// }

// export function handleAxiosError(error: unknown, showToast = true): void {
//   console.log("Handling error111:", error);
//   if (isAxiosError(error)) {
//     const errorData = error.response?.data as ErrorResponse;
//     const statusCode = error.response?.status;
//     const errorsList = errorData.errors;

//     console.log("errorData33:", errorData);

//     if (showToast) {
//       // 1) errors is an array of strings (your case!)
//       if (Array.isArray(errorsList)) {
//         errorsList.forEach((msg) =>
//           Toast.show({ type: "error", text1: msg, position: "top" })
//         );
//       }
//       // 2) object-map of arrays: { field: ["error1", "error2"] }
//       else if (
//         errorsList &&
//         typeof errorsList === "object" &&
//         !Array.isArray(errorsList)
//       ) {
//         for (const messages of Object.values(errorsList)) {
//           if (Array.isArray(messages)) {
//             messages.forEach((msg) =>
//               Toast.show({ type: "error", text1: msg, position: "top" })
//             );
//           }
//         }
//       }
//       // 3) single string in `errors`
//       else if (typeof errorsList === "string") {
//         Toast.show({ type: "error", text1: errorsList, position: "top" });
//       }
//       // 4) single `message` property
//       else if (errorData.message) {
//         Toast.show({
//           type: "error",
//           text1: errorData.message,
//           position: "top",
//         });
//       }
//       // 5) single `error` property
//       else if (errorData.error) {
//         Toast.show({ type: "error", text1: errorData.error, position: "top" });
//       }
//       // 6) fallback
//       else {
//         Toast.show({
//           type: "error",
//           text1: `Request failed with status ${statusCode}`,
//           position: "top",
//         });
//       }
//     }
//   } else if (error instanceof Error) {
//     if (showToast) {
//       Toast.show({ type: "error", text1: error.message, position: "top" });
//     }
//   } else {
//     console.log("Unknown error type:", error);
//     if (showToast) {
//       Toast.show({
//         type: "error",
//         text1: "An unknown error occurred",
//         position: "top",
//       });
//     }
//   }
// }


// src/lib/handleAxiosError.ts
import { isAxiosError } from "axios";
import Toast from "react-native-toast-message";

interface ErrorResponse {
  message?: string;
  errors?: Record<string, string[]> | string | string[];
  error?: string;
}

export function handleAxiosError(error: unknown, showToast = true): void {
  console.log("Handling error:", error);

  if (isAxiosError(error)) {
    const errorData = error.response?.data as ErrorResponse;
    const statusCode = error.response?.status;
    const errorsList = errorData?.errors;

    console.log("errorData:", errorData);

    if (showToast) {
      // 1) errors is an array of strings
      if (Array.isArray(errorsList)) {
        errorsList.forEach((msg) =>
          Toast.show({
            type: "error",
            text1: "Request Error",
            text2: msg,
            position: "top",
            visibilityTime: 4000,
          })
        );
      }
      // 2) errors is an object: { field: ["error1", "error2"] }
      else if (
        errorsList &&
        typeof errorsList === "object" &&
        !Array.isArray(errorsList)
      ) {
        for (const messages of Object.values(errorsList)) {
          if (Array.isArray(messages)) {
            messages.forEach((msg) =>
              Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: msg,
                position: "top",
                visibilityTime: 5000,
              })
            );
          }
        }
      }
      // 3) errors is a single string
      else if (typeof errorsList === "string") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: errorsList,
          position: "top",
          visibilityTime: 4000,
        });
      }
      // 4) message property
      else if (errorData?.message) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: errorData.message,
          position: "top",
          visibilityTime: 4000,
        });
      }
      // 5) error property
      else if (errorData?.error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: errorData.error,
          position: "top",
          visibilityTime: 4000,
        });
      }
      // 6) fallback
      else {
        Toast.show({
          type: "error",
          text1: "Request Failed",
          text2: `Status ${statusCode ?? "Unknown"}`,
          position: "top",
          visibilityTime: 4000,
        });
      }
    }
  } else if (error instanceof Error) {
    if (showToast) {
      Toast.show({
        type: "error",
        text1: "Unexpected Error",
        text2: error.message,
        position: "top",
        visibilityTime: 4000,
      });
    }
  } else {
    console.log("Unknown error type:", error);
    if (showToast) {
      Toast.show({
        type: "error",
        text1: "Unknown Error",
        text2: "Something went wrong. Please try again.",
        position: "top",
        visibilityTime: 4000,
      });
    }
  }
}


