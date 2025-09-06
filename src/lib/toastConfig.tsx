// app/lib/toastConfig.ts
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import { rS, rV } from "./responsivehandler";

const toastConfig = {
  /*
   * Default success/error/info styles — you can override or extend
   */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#22c55e", // green-500
        backgroundColor: "#f0fdf4", // green-50
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
        color: "#166534", // green-800
        fontFamily: "PoppinsSemiBold",
      }}
      text2Style={{
        fontSize: 12,
        color: "#4ade80", // green-400
        fontFamily: "PoppinsRegular",
      }}
    />
  ),
  // Inside ToastConfig.tsx
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#DC2626", // strong red accent
        borderLeftWidth: 5,
        backgroundColor: "#FEE2E2", // light red background
        height: rV(70),
        width: "90%",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: "center",
      }}
      text1Style={{
        fontSize: rS(14),
        fontWeight: "700", // bold title
        color: "#B91C1C", // dark red
        fontFamily: "PoppinsSemiBold",
      }}
      text2Style={{
        fontSize: rS(13),
        fontWeight: "600", // semi-bold for details
        color: "#7F1D1D", // slightly darker red for readability
        fontFamily: "PoppinsRegular",
        marginTop: 2,
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 5,
          }}
        >
          <AntDesign name="closecircle" size={24} color="#DC2626" />
        </View>
      )}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#3b82f6", // blue-500
        backgroundColor: "#eff6ff", // blue-50
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
        color: "#1d4ed8", // blue-800
        fontFamily: "PoppinsSemiBold",
      }}
      text2Style={{
        fontSize: 12,
        color: "#93c5fd", // blue-300
        fontFamily: "PoppinsRegular",
      }}
    />
  ),

  // Optional: custom "warning" type
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#f59e0b", // amber-500
        backgroundColor: "#fffbeb", // amber-50
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
        color: "#92400e", // amber-800
        fontFamily: "PoppinsSemiBold",
      }}
      text2Style={{
        fontSize: 12,
        color: "#fcd34d", // amber-300
        fontFamily: "PoppinsRegular",
      }}
    />
  ),
};

export default toastConfig;
