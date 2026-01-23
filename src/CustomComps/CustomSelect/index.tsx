// import { rS, rV } from "@/src/lib/responsivehandler";
// import { AntDesign } from "@expo/vector-icons";
// import React from "react";
// import {
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from "react-native";

// interface Item {
//   title: string;
//   value: string;
//   price?: string;
// }

// interface Props {
//   label?: string;
//   setOpenDropDown: (open: boolean) => void;
//   openDropDown: boolean;
//   selected: Item | null;
//   setSelected: (item: Item | null) => void;
//   placeholder: string;
//   dataItem: Item[];
//   whiteBg?: boolean;
//   primary?: boolean;
//   style?: ViewStyle;
//   icon?: React.ReactNode;
// }

// const CustomSelect: React.FC<Props> = ({
//   label,
//   setOpenDropDown,
//   openDropDown,
//   selected,
//   setSelected,
//   placeholder,
//   dataItem,
//   primary,
//   whiteBg,
//   icon,
//   style,
// }) => {
//   const handleItemPress = (item: Item) => {
//     setSelected(item);
//     setOpenDropDown(false);
//   };

//   const getBgColor = () => {
//     if (primary) return "border border-[#B4B4B4] bg-onsurface";
//     if (whiteBg) return "bg-[#ffffff] border border-divider";
//   };

//   return (
//     <>
//       {label && (
//         <Text
//           className="mb-2 font-[PoppinsMedium] text-[#101828]"
//           style={{ fontSize: rS(12) }}
//         >
//           {label}
//         </Text>
//       )}
//       <TouchableOpacity
//         className={` justify-center p-3 rounded-2xl ${getBgColor()} `}
//         onPress={() => setOpenDropDown(!openDropDown)}
//         style={{ height: rV(45) }}
//         // style={style}
//       >
//         <View className="flex-row items-center justify-between">
//           <View className="flex-row items-center">
//             <View className="">{icon && icon}</View>
//             <Text
//               className=" mx-3  font-[PoppinsRegular]"
//               style={{ fontSize: rS(12) }}
//             >
//               {selected ? selected.title : placeholder}
//             </Text>
//           </View>

//           <View className="">
//             <AntDesign
//               name={openDropDown ? "up" : "down"}
//               size={20}
//               color="#1E1D2F"
//             />
//           </View>
//         </View>
//       </TouchableOpacity>
//       {openDropDown && (
//         <ScrollView
//           className=" p-3 rounded-lg h-auto"
//           nestedScrollEnabled={true}
//           style={{ maxHeight: 200 }}
//         >
//           {dataItem.map((item: Item) => (
//             <TouchableOpacity
//               key={item.value}
//               style={{ height: rV(40) }}
//               className="flex-row items-center border border-[#E8E8E8] justify-between my-1 p-2 rounded-2xl "
//               onPress={() => handleItemPress(item)}
//             >
//               <View>
//                 <Text
//                   className="font-[PoppinsRegular]"
//                   style={{ fontSize: rS(12) }}
//                 >
//                   {item.title}
//                 </Text>
//                 {item.price && (
//                   <Text className=" text-xs font-[PoppinsRegular]">
//                     {item.price}
//                   </Text>
//                 )}
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}
//     </>
//   );
// };

// export default CustomSelect;

import { rS, rV } from "@/src/lib/responsivehandler";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Item {
  title: string;
  value: string;
}

interface Props {
  label?: string;
  selected: Item | null;
  setSelected: (item: Item | null) => void;
  placeholder: string;
  dataItem: Item[];
  primary?: boolean;
  style?: ViewStyle;
}

const CustomSelect: React.FC<Props> = ({
  label,
  selected,
  setSelected,
  placeholder,
  dataItem = [],
  primary,
}) => {
  const formattedData = dataItem.map((item) => ({
    label: item.title,
    value: item.value,
  }));

  return (
    <View className="mb-4">
      {label && (
        <Text
          className="mb-2 font-[PoppinsMedium] text-[#101828]"
          style={{ fontSize: rS(12) }}
        >
          {label}
        </Text>
      )}

      <Dropdown
        style={[styles.dropdown, primary && styles.primaryBg]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.containerStyle}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.itemContainerStyle}
        inputSearchStyle={styles.inputSearchStyle} // Search bar style
        data={formattedData}
        // --- Search Configuration ---
        search
        searchPlaceholder="Search category..."
        // renderLeftIcon={() => (
        //   <AntDesign
        //     name="search"
        //     size={14}
        //     color="#2E6939"
        //     style={{ marginRight: 8 }}
        //   />
        // )}
        // ----------------------------

        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selected?.value}
        onChange={(item) => {
          setSelected({ title: item.label, value: item.value });
        }}
        renderRightIcon={() => (
          <AntDesign name="down" size={16} color="#1E1D2F" />
        )}
      />
    </View>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  dropdown: {
    height: rV(48),
    borderColor: "#B4B4B4",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  primaryBg: {
    backgroundColor: "#F9FAFB",
  },
  placeholderStyle: {
    fontSize: rS(13),
    fontFamily: "PoppinsRegular",
    color: "#9EA0A4",
  },
  selectedTextStyle: {
    fontSize: rS(13),
    fontFamily: "PoppinsRegular",
    color: "#1E1D2F",
  },
  containerStyle: {
    borderRadius: 12,
    marginTop: 4,
    overflow: "hidden",
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTextStyle: {
    fontSize: rS(12),
    fontFamily: "PoppinsRegular",
    color: "#1E1D2F",
  },
  itemContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  inputSearchStyle: {
    height: rV(40),
    fontSize: rS(13),
    borderRadius: 8,
    fontFamily: "PoppinsRegular",
    color: "#2E6939",
  },
});
