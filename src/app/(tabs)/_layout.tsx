import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";
import { Platform } from "react-native";

const HIDDEN_ROUTES = ["chat-room"];

export default function TabsLayout() {
  const segments = useSegments();
  const shouldHideTabBar = segments.some((s) =>
    HIDDEN_ROUTES.some((r) => s.includes(r))
  );

  const baseTabBarStyle = Platform.select({
    ios: { position: "absolute" as const },
    default: {},
  });

  return (
    <Tabs
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false,
        tabBarStyle: shouldHideTabBar
          ? { display: "none" }
          : baseTabBarStyle,
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="homepage"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messagepage/index"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="searchpage/index"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profilepage"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user-alt"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
