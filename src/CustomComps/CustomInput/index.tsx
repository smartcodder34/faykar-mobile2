import { rS, rV } from "@/src/lib/responsivehandler";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

type InputType = {
  label?: string;
  name?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  iconPostion?: string;
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
}: // width,
InputType) => {
  const [focused, setFocused] = React.useState(false);
  // const width = 60
  const Spacer = ({ height = 16 }) => <View style={{ height }} />;

  const getFlexDirection = () => {
    if (!icon && !iconPostion) {
      return "flex-row";
    }
    if (icon && iconPostion) {
      if (iconPostion === "left") {
        return "flex-row";
      } else {
        if (iconPostion === "right") {
          return "flex-row-reverse";
        }
      }
    }
  };

  const getBgColor = () => {
    if (primary) return "border border-[#B4B4B4] bg-onsurface";
    if (whiteBg) return "bg-[#ffffff] border border-divider";
  };
  return (
    <>
      <View className="my-1">
        <Skeleton show={isLoading} width={"60%"} colorMode={"light"}>
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
        </Skeleton>
        {isLoading && <Spacer />}
        <Skeleton show={isLoading} colorMode={"light"}>
          <View
            className={` rounded-2xl ${getBgColor()}  items-center px-3 ${getFlexDirection()}`}
            style={{ height: rV(45) }}
          >
            <View className="">{icon && icon}</View>
            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor="#9B9B9B"
              keyboardType={keyboardType as KeyboardTypeOptions}
              onBlur={() => {
                setFocused(false);
              }}
              // onFocus={() => {
              //   setFocused(true);
              // }}
              editable={editable}
              onFocus={onFocus}
              onChangeText={onChangeText}
              value={value}
              textAlign={isArabic ? "right" : undefined} // Right-align for Arabic
              style={{
                fontSize: rS(14),
                height: rV(44),
                flex: 1,
                padding: 2,
                color: "#000",
              }}
            />
          </View>
        </Skeleton>
        {isLoading && <Spacer />}
        <Skeleton show={isLoading} width={"60%"} colorMode={"light"}>
          <>
            {error && (
              <Text
                className=" text-red  px-2 font-[PoppinsLight]"
                style={{ fontSize: rS(10) }}
              >
                {error}
              </Text>
            )}
          </>
        </Skeleton>
      </View>
    </>
  );
};

export default CustomInput;
