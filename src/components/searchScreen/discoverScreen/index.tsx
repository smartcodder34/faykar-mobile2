import { rS } from '@/src/lib/responsivehandler';
import React from 'react';
import { Text, View } from 'react-native';
import { RenderProductImage } from './RenderProductImage';

const DiscoverScreen = () => {

     // Mock product images matching the design
      const products = [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
          name: 'Gourmet Burger',
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop',
          name: 'Denim Jeans',
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop',
          name: 'Pink Blazer',
        },
        {
          id: 4,
          image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop',
          name: 'Yellow Bananas',
        },
        {
          id: 5,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
          name: 'Nike Shoes',
        },
        {
          id: 6,
          image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop',
          name: 'Fresh Strawberry',
        },
      ];
  return (
    <View className="flex-1 px-4">
      <Text
        className="font-[PoppinsSemiBold] text-primary mb-4"
        style={{ fontSize: rS(16) }}
      >
        See products available near you
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {products.map((item) => (
          <RenderProductImage key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

export default DiscoverScreen