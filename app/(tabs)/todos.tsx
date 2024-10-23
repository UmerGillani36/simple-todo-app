import {
  FlatList,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Task } from "@/types/types";
import { useCallback, useState, useMemo } from "react";
import {
  getTasksFromAsyncStorage,
  saveTasksToAsyncStorage,
} from "@/helper/helper";
import Constants from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { styles } from "@/styles/todoStyles";

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

  const deleteTask = useCallback(
    async (id: string) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);

      await saveTasksToAsyncStorage(updatedTasks);
    },
    [tasks]
  );

  const renderTask = useCallback(
    ({ item }: { item: Task }) => (
      <View
        style={{
          ...styles.taskContainer,
          backgroundColor: Colors[theme].cardBg,
        }}
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
          <Text
            style={{ ...styles.taskDescription, color: Colors[theme].text }}
          >
            {item.description}
          </Text>
          <Text style={{ ...styles.taskInfo, color: Colors[theme].text }}>
            User: {item.user ?? "N/A"} | Country: {item.country ?? "N/A"}
          </Text>
        </View>
      </View>
    ),
    [theme, deleteTask]
  );

  const memoizedTasks = useMemo(() => tasks, [tasks]);

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: statusBarHeight ? statusBarHeight + 20 : 50,
          backgroundColor: Colors[theme].background,
        },
      ]}
    >
      <ThemedText
        type="title"
        style={{ ...styles.headerText, color: Colors[theme].text }}
      >
        Tasks
      </ThemedText>
      <FlatList
        data={memoizedTasks}
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
