import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

const HIDDEN_ROUTES = ["chat-room"];

const BASE_TAB_BAR_STYLE = Platform.select({
  ios: { position: "absolute" as const },
  default: {},
});

function getTabBarVisibility(routeName: string) {
  return HIDDEN_ROUTES.some((r) => routeName.includes(r));
}

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false,
        tabBarStyle: BASE_TAB_BAR_STYLE,
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="homepage"
        options={({ route }) => ({
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
          tabBarStyle: getTabBarVisibility(route.name)
            ? { display: "none" }
            : BASE_TAB_BAR_STYLE,
        })}
      />
      <Tabs.Screen
        name="messagepage/index"
        options={({ route }) => ({
          title: "Messages",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
          tabBarStyle: getTabBarVisibility(route.name)
            ? { display: "none" }
            : BASE_TAB_BAR_STYLE,
        })}
      />
      <Tabs.Screen
        name="searchpage/index"
        options={({ route }) => ({
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
          tabBarStyle: getTabBarVisibility(route.name)
            ? { display: "none" }
            : BASE_TAB_BAR_STYLE,
        })}
      />
      <Tabs.Screen
        name="profilepage"
        options={({ route }) => ({
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user-alt"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
          tabBarStyle: getTabBarVisibility(route.name)
            ? { display: "none" }
            : BASE_TAB_BAR_STYLE,
        })}
      />
    </Tabs>
  );
}
