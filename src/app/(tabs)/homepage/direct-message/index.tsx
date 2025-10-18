import Screen from '@/src/layout/Screen';
import { rS } from '@/src/lib/responsivehandler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import CustomInput from '@/src/CustomComps/CustomInput';

const DirectMessage = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState('');

  const frequentChats = React.useMemo(
    () => [
      { id: '1', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop', online: true },
      { id: '2', image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop', online: true },
      { id: '3', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=100&h=100&fit=crop', online: true },
      { id: '4', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', online: false },
      { id: '5', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop', online: true },
    ],
    []
  );

  type DeliveryStatus = 'single' | 'double' | 'read';

  const messages = React.useMemo(
    () => [
      {
        id: 'm1',
        name: 'Abdul Quay',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces',
        lastMessage: 'olabodeoyindolapo@gmail.com',
        time: '08:43',
        unread: 3,
      },
      {
        id: 'm2',
        name: 'Chris Uil',
        avatar:
          'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=80&h=80&fit=crop&crop=faces',
        lastMessage: '1,2 and 6 are remaining',
        time: '08:43',
        unread: 3,
      },
      {
        id: 'm3',
        name: 'Joe Mickey',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces',
        lastMessage: 'Send me d link bro',
        time: '08:43',
        status: 'read' as DeliveryStatus,
      },
      {
        id: 'm4',
        name: 'Ojogbon',
        avatar:
          'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=faces',
        lastMessage: 'Bobo yiiiiii 👍',
        time: '08:43',
        status: 'double' as DeliveryStatus,
      },
      {
        id: 'm5',
        name: 'General Focus',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=faces',
        lastMessage: 'Update from your end',
        time: '09:43',
        unread: 2,
      },
      {
        id: 'm6',
        name: 'Sister Lee',
        avatar:
          'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop&crop=faces',
        lastMessage: 'Okay dear...How much?',
        time: 'Yesterday',
        unread: 1,
      },
      {
        id: 'm7',
        name: 'Abdul Q',
        avatar:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=faces',
        lastMessage: ' ',
        time: 'Yesterday',
      },
    ],
    []
  );

  const filteredMessages = React.useMemo(() => {
    if (!searchQuery.trim()) return messages;
    const q = searchQuery.toLowerCase();
    return messages.filter(
      (m) => m.name.toLowerCase().includes(q) || m.lastMessage.toLowerCase().includes(q)
    );
  }, [messages, searchQuery]);

  const renderUnreadBadge = (count?: number) => {
    if (!count) return <View />;
    return (
      <View className="min-w-[20px] h-5 px-1 bg-[#2E6939] rounded-full items-center justify-center">
        <Text className="text-white text-[10px] font-semibold">{count}</Text>
      </View>
    );
  };

  const renderDelivery = (status?: DeliveryStatus) => {
    if (!status) return <View />;
    if (status === 'single') {
      return <Ionicons name="checkmark" size={16} color="#6B7280" />;
    }
    if (status === 'double') {
      return <Ionicons name="checkmark-done-outline" size={16} color="#6B7280" />;
    }
    return <Ionicons name="checkmark-done" size={16} color="#2E6939" />;
  };

  return (
    <Screen className="bg-white" scroll={true}>
      {/* Header */}
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

      {/* Search */}
      <View className="px-4">
        <CustomInput
          placeholder="Search chat here....."
          primary
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Ionicons name="search" size={18} color="#7A7A7A" />}
        />
      </View>

      {/* Frequently chatted */}
      <View className="px-4 mt-2">
        <Text className="text-black font-semibold" style={{ fontSize: rS(12) }}>
          Frequently chatted
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {frequentChats.map((item) => (
          <View key={item.id} className="w-[60px] h-[60px] rounded-xl overflow-hidden mr-3 relative">
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
            <View
              className={`w-3 h-3 rounded-full absolute bottom-1 right-1 ${
                item.online ? 'bg-[#2E6939]' : 'bg-red-500'
              }`}
            />
          </View>
        ))}
      </ScrollView>

      {/* All Messages */}
      <View className="px-4 mt-4">
        <Text className="text-black font-semibold mb-2" style={{ fontSize: rS(12) }}>
          All Messages
        </Text>
      </View>

      <View className="px-2">
        {filteredMessages.map((m) => (
          <TouchableOpacity
            key={m.id}
            className="flex-row items-center justify-between px-2 py-3"
            activeOpacity={0.7}
            onPress={() => router.push('/(tabs)/messagepage')}
          >
            {/* Left: Avatar + name/message */}
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <Image
                  source={{ uri: m.avatar }}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="text-black font-semibold" style={{ fontSize: rS(12) }}>
                  {m.name}
                </Text>
                <Text className="text-[#6B7280]" style={{ fontSize: rS(10) }} numberOfLines={1}>
                  {m.lastMessage}
                </Text>
              </View>
            </View>

            {/* Right: time + unread/status */}
            <View className="items-end w-[70px]">
              <Text className="text-[#9CA3AF] mb-1" style={{ fontSize: rS(10) }}>
                {m.time}
              </Text>
              {m.unread ? renderUnreadBadge(m.unread) : renderDelivery(m.status as DeliveryStatus)}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

export default DirectMessage