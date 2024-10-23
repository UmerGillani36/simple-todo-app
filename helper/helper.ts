import { Task } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to get tasks from AsyncStorage
export const getTasksFromAsyncStorage = async (): Promise<Task[]> => {
  try {
    const tasksString = await AsyncStorage.getItem("tasks");
    return tasksString ? JSON.parse(tasksString) : [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Function to save tasks to AsyncStorage
export const saveTasksToAsyncStorage = async (
  taskList: Task[]
): Promise<void> => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(taskList));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};
