import Screen from '@/src/layout/Screen';
import { rS } from '@/src/lib/responsivehandler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const DirectMessage = () => {
    const router = useRouter()
  return (
    <Screen className="">
      <View className="flex-row items-center justify-between p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[InterSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            Messages
          </Text>
        </View>
        <View />
      </View>
      <Text>DirectMessage</Text>
    </Screen>
  );
}

export default DirectMessage