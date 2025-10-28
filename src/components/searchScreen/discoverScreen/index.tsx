import { rS } from '@/src/lib/responsivehandler';
import discoverData from "@/src/mocks/discoverMocks.json";
import React from 'react';
import { Text, View } from 'react-native';
import { RenderProductImage } from './RenderProductImage';

const DiscoverScreen = () => {

  console.log("discoverData", discoverData?.data?.products);

    
  return (
    <View className="flex-1 px-4">
      <Text
        className="font-[PoppinsSemiBold] text-primary mb-4"
        style={{ fontSize: rS(16) }}
      >
        See products available near you
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {discoverData?.data?.products.map((item) => (
          <RenderProductImage key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

export default DiscoverScreen