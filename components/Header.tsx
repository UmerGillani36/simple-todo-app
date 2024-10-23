import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const statusBarHeight =
    Platform.OS === "ios" ? Constants.statusBarHeight : StatusBar.currentHeight;
  return (
    <ThemedView style={[styles.header, { paddingTop: statusBarHeight }]}>
      <Image
        source={require("@/assets/images/design-2.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.headerTitleContainer}>
        <ThemedText type="title" style={styles.headerTitle}>
          Simple Todo App
        </ThemedText>
      </View>
      <View style={styles.headerIcon}>
        {theme === "light" ? (
          <TouchableOpacity style={styles.sunIcon} onPress={toggleTheme}>
            <Feather name="sun" size={28} color="yellow" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.moonIcon} onPress={toggleTheme}>
            <Feather name="moon" size={28} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 190,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  headerTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 110,
    left: 0,
    right: 0,
  },
  headerTitle: {
    fontSize: 32,
    color: "#fff",
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerIcon: {
    position: "absolute",
    right: 20,
    top: 50,
  },
  sunIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "yellow",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 50,
    elevation: 10,
  },
  moonIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 50,
    elevation: 10,
  },
});
