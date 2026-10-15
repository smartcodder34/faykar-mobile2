import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { Platform } from "react-native";

const BASE_TAB_BAR_STYLE = Platform.select({
  ios: { position: "absolute" as const },
  default: {},
});

const HIDDEN_PATHS = [
  "/homepage/comments",
  "/messagepage",
  "/searchpage",
  "/homepage/direct-message/chat-room",
];

function isTabBarHidden(pathname: string) {
  return HIDDEN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export default function TabsLayout() {
  const pathname = usePathname();
  const tabBarStyle = isTabBarHidden(pathname)
    ? { ...BASE_TAB_BAR_STYLE, display: "none" as const }
    : BASE_TAB_BAR_STYLE;

  return (
    <Tabs
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false,
        tabBarStyle,
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="homepage"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
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
          tabBarIcon: ({ focused }) => (
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
          tabBarIcon: ({ focused }) => (
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
          tabBarIcon: ({ focused }) => (
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
