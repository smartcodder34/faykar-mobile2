import { useDiscoverAccount, useRecentlySearched } from "@/src/api-services/discoversApi/discoverQuery";
import { getInitials } from "@/src/utils/getInitials";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const AccountsScreen = ({ searchQuery }: any) => {
  const getRecentlySearched = useRecentlySearched();
  const getSearchAccount = useDiscoverAccount(searchQuery);

  React.useEffect(() => {
    getSearchAccount.refetch();
  }, [searchQuery]);

  console.log("getAccount30000000", getSearchAccount?.data?.data?.users);
  // const resentlySearchUser = getRecentlySearched?.data?.data?.users;
  const resentlySearchUser = getSearchAccount?.data?.data?.users;

  const handleRemove = (id: any) => {
    // setRecentAccounts(recentAccounts.filter((account) => account.id !== id));
  };

  const handleClearAll = () => {};

  return (
    <View className="bg-white flex-1">
      {/* Recent Header */}
      <View className="flex-row justify-between items-center px-5 py-4">
        <Text className="text-xl font-bold text-gray-900">Recent</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text className="text-gray-400 text-sm font-medium">Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Accounts List */}
      <ScrollView className="px-5">
        {resentlySearchUser?.length > 0 ? (
          resentlySearchUser.map((account: any, index: number) => (
            <TouchableOpacity
              key={account.id}
              className={`flex-row items-center justify-between py-3 ${
                index !== resentlySearchUser?.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="flex-row items-center gap-3">
                {/* Avatar */}
                {/* <Image
                  source={{ uri: account.avatar }}
                  className="w-12 h-12 rounded-full bg-gray-200"
                /> */}
                <View className=" w-10 h-10 bg-slate-200 rounded-full items-center justify-center">
                  <Text>{getInitials(account.full_name)}</Text>
                </View>

                {/* Name and Time */}
                <View>
                  <Text className="text-base font-semibold text-gray-900">
                    {account.full_name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {account.updated_at}
                  </Text>
                </View>
              </View>

              {/* Remove Button */}
              <TouchableOpacity
                onPress={() => handleRemove(account.id)}
                className="p-2"
              >
                <View className="w-5 h-5">
                  <View className="absolute w-full h-0.5 bg-gray-400 transform rotate-45 top-2.5" />
                  <View className="absolute w-full h-0.5 bg-gray-400 transform -rotate-45 top-2.5" />
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 text-base">No recent accounts</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AccountsScreen;
