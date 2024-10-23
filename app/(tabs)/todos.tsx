import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Task } from "@/types/types";
import { useCallback, useState } from "react";
import {
  getTasksFromAsyncStorage,
  saveTasksToAsyncStorage,
} from "@/helper/helper";
import Constants from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { theme } = useTheme();

  const statusBarHeight =
    Platform.OS === "ios" ? Constants.statusBarHeight : StatusBar.currentHeight;

  const fetchTasks = async () => {
    const storedTasks = await getTasksFromAsyncStorage();
    setTasks(storedTasks);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    await saveTasksToAsyncStorage(updatedTasks);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View
      style={{ ...styles.taskContainer, backgroundColor: Colors[theme].cardBg }}
    >
      <View style={styles.taskContent}>
        <View style={styles.taskHead}>
          <Text style={{ ...styles.taskTitle, color: Colors[theme].text }}>
            {item.title}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.id)}
          >
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={{ ...styles.taskDescription, color: Colors[theme].text }}>
          {item.description}
        </Text>
        <Text style={{ ...styles.taskInfo, color: Colors[theme].text }}>
          User: {item.user ?? "N/A"} | Country: {item.country ?? "N/A"}
        </Text>
      </View>
    </View>
  );

  return (
    <ThemedView
      style={[
        styles.container,
        { paddingTop: statusBarHeight ? statusBarHeight + 20 : 50, backgroundColor: Colors[theme].background},
      ]}
    >
      <ThemedText type="title" style={{...styles.headerText, color:Colors[theme].text}}>
        Tasks
      </ThemedText>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks available.</Text>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FA",
  },
  headerText: {
    marginBottom: 20,
    color: "#333",
  },
  listContent: {
    paddingBottom: 20,
  },
  taskContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskHead: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  taskContent: {
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
    paddingLeft: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  taskInfo: {
    fontSize: 12,
    color: "#999",
  },
  emptyText: {
    textAlign: "center",
    color: "#AAA",
    marginTop: 50,
  },
});
