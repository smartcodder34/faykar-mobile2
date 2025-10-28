// import { rS } from "@/src/lib/responsivehandler";
// import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

// export const RenderProductImage = ({ item }: { item: any }) => (
//   <TouchableOpacity
//     className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 mx-2"
//     style={{ width: "45%" }}
//   >
//     <View className="w-full h-40 bg-gray-200">
//       <View className="w-full h-full items-center justify-center">
//         <ImageBackground source={{ uri: item.images[0]}} styles={{width:"!00%", height:"100%"}}>
//           <Text
//             className="text-gray-500 font-medium"
//             style={{ fontSize: rS(12) }}
//           >
//             {item.name}
//           </Text>
//         </ImageBackground>
//       </View>
//     </View>
//   </TouchableOpacity>
// );


import { rS } from "@/src/lib/responsivehandler";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export const RenderProductImage = ({ item }: { item: any }) => (
  <TouchableOpacity
    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 mx-2"
    style={{ width: "45%" }}
  >
    <View className="w-full h-40 bg-gray-200">
      <ImageBackground
        source={{ uri: item.images[0][0] }} // Access first URL from the nested array
        style={{ width: "100%", height: "100%" }} // Fixed: style not styles, and "100%" not "!00%"
        resizeMode="cover"
      >
        <View className="w-full h-full items-center justify-center bg-black/20">
          <Text className="text-white font-medium" style={{ fontSize: rS(12) }}>
            {item.name}
          </Text>
        </View>
      </ImageBackground>
    </View>
  </TouchableOpacity>
);