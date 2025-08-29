import { rS, rV } from "@/src/lib/responsivehandler";
import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

type InputType = {
  label?: string;
  name?: string;
  placeholder?: string;
  icon?: React.ReactNode; // Left icon (for backward compatibility)
  leftIcon?: React.ReactNode; // Explicit left icon
  rightIcon?: React.ReactNode; // Right icon
  iconPostion?: string; // Keep for backward compatibility
  value?: string;
  onChangeText?: (text?: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: string;
  primary?: boolean;
  whiteBg?: boolean;
  width?: number;
  multiline?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  editable?: boolean;
  isLoading?: boolean;
  isArabic?: boolean;
};

const CustomInput = ({
  label,
  icon,
  leftIcon,
  rightIcon,
  iconPostion,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
  primary,
  whiteBg,
  error,
  editable,
  onFocus,
  isArabic,
  onBlur,
  multiline,
  isLoading,
}: InputType) => {
  const [focused, setFocused] = React.useState(false);

  // Determine which icons to use
  const getLeftIcon = () => {
    if (leftIcon) return leftIcon;
    if (icon && (!iconPostion || iconPostion === "left")) return icon;
    return null;
  };

  const getRightIcon = () => {
    if (rightIcon) return rightIcon;
    if (icon && iconPostion === "right") return icon;
    return null;
  };

  const getBgColor = () => {
    if (primary) return "border border-[#B4B4B4] bg-onsurface";
    if (whiteBg) return "bg-[#ffffff] border border-divider";
  };

  const leftIconElement = getLeftIcon();
  const rightIconElement = getRightIcon();

  return (
    <>
      <View className="my-1">
        <>
          {label && (
            <Text
              className="mb-2 font-[PoppinsMedium] text-black "
              style={{ fontSize: rS(12) }}
            >
              {label}
            </Text>
          )}
        </>
        <View
          className={`rounded-2xl ${getBgColor()} flex-row items-center px-3`}
          style={{ height: rV(45) }}
        >
          {/* Left Icon */}
          {leftIconElement && <View className="mr-2">{leftIconElement}</View>}

          {/* Text Input */}
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor="#9B9B9B"
            keyboardType={keyboardType as KeyboardTypeOptions}
            onBlur={() => {
              setFocused(false);
            }}
            editable={editable}
            onFocus={onFocus}
            onChangeText={onChangeText}
            value={value}
            textAlign={isArabic ? "right" : undefined}
            style={{
              fontSize: rS(14),
              height: rV(44),
              flex: 1,
              padding: 2,
              color: "#000",
            }}
          />

          {/* Right Icon */}
          {rightIconElement && <View className="ml-2">{rightIconElement}</View>}
        </View>

        <>
          {error && (
            <Text
              className=" text-red-500 mt-2  px-2 font-[PoppinsLight]"
              style={{ fontSize: rS(10) }}
            >
              {error}
            </Text>
          )}
        </>
      </View>
    </>
  );
};

export default CustomInput;
