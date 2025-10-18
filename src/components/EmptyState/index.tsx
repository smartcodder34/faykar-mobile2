import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Feather
        name="lock"
        size={48}
        color="#D1D5DB"
        style={{ marginBottom: 12 }}
      />
      <Text style={styles.title}>No Data Found</Text>
      <Text style={styles.subtitle}>
        Please check back later or try refreshing.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 192, // ~ h-48
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151", // text-gray-700
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF", // text-gray-400
    marginTop: 4,
  },
});

export default EmptyState;
