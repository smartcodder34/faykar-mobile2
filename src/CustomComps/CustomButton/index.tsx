import { rS, rV } from "@/src/lib/responsivehandler";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type ButtonType = {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  primary?: boolean;
  danger?: boolean;
  whiteBg?: boolean;
  borderBn?: boolean;
  icon?: React.ReactNode;
  iconPostion?: string;
  onPress?: () => void;
  style?: any;
};
const CustomButton = ({
  title,
  disabled,
  primary,
  danger,
  loading,
  whiteBg,
  borderBn,
  onPress,
  style,
}: ButtonType) => {
  const getBgColor = () => {
    if (disabled) return "bg-divider";
    if (primary) return "bg-primary text-white";
    if (danger) return "bg-red";
    if (whiteBg) return "text-primary font-bold";
    if (borderBn) return "border border-divider";
  };

  const disabledTextBtn = disabled ? "text-black" : "text-white";
  return (
    <TouchableOpacity
      className={`px-2 rounded-2xl items-center justify-center ${getBgColor()}`}
      style={{ height: rV(40) }}
      disabled={disabled}
      onPress={onPress}
    >
      <View className={` flex-row `}>
        {title && (
          <>
            <Text
              className={` font-[PoppinsMedium]   ${
                borderBn ? null : getBgColor()
              }`}
              style={{ fontSize: rS(12) }}
            >
              {loading ? <ActivityIndicator /> : title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
