// src/components/Toast/ToastConfig.tsx
import { rS, rV } from "@/src/lib/responsivehandler";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";

export const toastConfig = {
  /*
    Override the default success toast
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#2E6939",
        borderLeftWidth: 5,
        backgroundColor: "#ffffff",
        height: rV(70),
        width: "90%",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: "center",
      }}
      text1Style={{
        fontSize: rS(14),
        fontWeight: "600",
        color: "#2E6939",
        fontFamily: "PoppinsSemiBold",
      }}
      text2Style={{
        fontSize: rS(12),
        color: "#101828",
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
          <AntDesign name="checkcircle" size={24} color="#2E6939" />
        </View>
      )}
    />
  ),

  /*
    Override the default error toast
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#DC2626",
        borderLeftWidth: 5,
        backgroundColor: "#ffffff",
        height: rV(70),
        width: "90%",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: "center",
      }}
      text1Style={{
        fontSize: rS(14),
        fontWeight: "600",
        color: "#DC2626",
        fontFamily: "PoppinsSemiBold",
      }}
      text2Style={{
        fontSize: rS(12),
        color: "#101828",
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

  /*
    Override the default info toast
  */
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: "#3B82F6",
        borderLeftWidth: 5,
        backgroundColor: "#ffffff",
        height: rV(70),
        width: "90%",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: "center",
      }}
      text1Style={{
        fontSize: rS(14),
        fontWeight: "600",
        color: "#3B82F6",
        fontFamily: "PoppinsSemiBold",
      }}
      text2Style={{
        fontSize: rS(12),
        color: "#101828",
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
          <AntDesign name="infocirlce" size={24} color="#3B82F6" />
        </View>
      )}
    />
  ),

  /*
    Custom warning toast
  */
  warning: (props: any) => (
    <View
      style={{
        height: rV(70),
        width: "90%",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderLeftColor: "#F59E0B",
        borderLeftWidth: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <AntDesign name="warning" size={24} color="#F59E0B" />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: rS(14),
            fontWeight: "600",
            color: "#F59E0B",
            fontFamily: "PoppinsSemiBold",
          }}
        >
          {props.text1}
        </Text>
        {props.text2 && (
          <Text
            style={{
              fontSize: rS(12),
              color: "#101828",
              fontFamily: "PoppinsRegular",
              marginTop: 2,
            }}
          >
            {props.text2}
          </Text>
        )}
      </View>
    </View>
  ),

  /*
    Custom loading toast
  */
  loading: (props: any) => (
    <View
      style={{
        height: rV(70),
        width: "90%",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderLeftColor: "#6B7280",
        borderLeftWidth: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <Feather name="loader" size={24} color="#6B7280" />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: rS(14),
            fontWeight: "600",
            color: "#6B7280",
            fontFamily: "PoppinsSemiBold",
          }}
        >
          {props.text1}
        </Text>
        {props.text2 && (
          <Text
            style={{
              fontSize: rS(12),
              color: "#101828",
              fontFamily: "PoppinsRegular",
              marginTop: 2,
            }}
          >
            {props.text2}
          </Text>
        )}
      </View>
    </View>
  ),
};
