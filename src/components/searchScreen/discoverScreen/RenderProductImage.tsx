import { rS } from "@/src/lib/responsivehandler";
import { Text, TouchableOpacity, View } from "react-native";

export const RenderProductImage = ({ item }: { item: any }) => (
  <TouchableOpacity
    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 mx-2"
    style={{ width: "45%" }}
  >
    <View className="w-full h-40 bg-gray-200">
      <View className="w-full h-full items-center justify-center">
        <Text
          className="text-gray-500 font-medium"
          style={{ fontSize: rS(12) }}
        >
          {item.name}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
