

import { rS, rV } from "@/src/lib/responsivehandler";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Item {
  title: string;
  value: string;
  price?: string;
}

interface Props {
  label?: string;
  setOpenDropDown: (open: boolean) => void;
  openDropDown: boolean;
  selected: Item | null;
  setSelected: (item: Item | null) => void;
  placeholder: string;
  dataItem: Item[];
  whiteBg?: boolean;
  primary?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<Props> = ({
  label,
  setOpenDropDown,
  openDropDown,
  selected,
  setSelected,
  placeholder,
  dataItem,
  primary,
  whiteBg,
  icon,
  style,
}) => {
  const handleItemPress = (item: Item) => {
    setSelected(item);
    setOpenDropDown(false);
  };

  const getBgColor = () => {
    if (primary) return "border border-[#B4B4B4] bg-onsurface";
    if (whiteBg) return "bg-[#ffffff] border border-divider";
  };



  return (
    <>
      {label && (
        <Text
          className="mb-2 font-[PoppinsMedium] text-[#101828]"
          style={{ fontSize: rS(12) }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        className={` justify-center p-3 rounded-2xl ${getBgColor()} `}
        onPress={() => setOpenDropDown(!openDropDown)}
        style={{ height: rV(45) }}
        // style={style}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="">
             {icon && icon}
            </View>
            <Text
              className=" mx-3  font-[PoppinsRegular]"
              style={{ fontSize: rS(12) }}
            >
              {selected ? selected.title : placeholder}
            </Text>
          </View>

          <View className="">
            <AntDesign
              name={openDropDown ? "up" : "down"}
              size={20}
              color="#1E1D2F"
            />
          </View>
        </View>
      </TouchableOpacity>
      {openDropDown && (
        <ScrollView
          className=" p-3 rounded-lg h-auto"
          nestedScrollEnabled={true}
          style={{ maxHeight: 200 }}
        >
          {dataItem.map((item: Item) => (
            <TouchableOpacity
              key={item.value}
              style={{ height: rV(40) }}
              className="flex-row items-center border border-[#E8E8E8] justify-between my-1 p-2 rounded-2xl "
              onPress={() => handleItemPress(item)}
            >
              <View>
                <Text
                  className="font-[PoppinsRegular]"
                  style={{ fontSize: rS(12) }}
                >
                  {item.title}
                </Text>
                {item.price && (
                  <Text className=" text-xs font-[PoppinsRegular]">
                    {item.price}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default CustomSelect;
