import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Task, TaskData } from "@/types/types";
import {
  getTasksFromAsyncStorage,
  saveTasksToAsyncStorage,
} from "@/helper/helper";
import Header from "@/components/Header";
import { users } from "@/constants/Constants";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { styles } from "@/styles/homeStyles";
import { fetchCountries } from "@/services/service";

export default function HomeScreen() {
  const [taskData, setTaskData] = useState<TaskData>({
    description: "",
    title: "",
    user: null,
    country: null,
  });
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const { theme } = useTheme();

  const addTask = async () => {
    const { title, description, user, country } = taskData;

    if (!title || !description || !user || !country) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      user,
      country,
    };

    const updatedTaskList: Task[] = [...taskList, newTask];
    setTaskList(updatedTaskList);
    await saveTasksToAsyncStorage(updatedTaskList);
    alert("Task saved successfully!");
    clearState();
  };

   const clearState = () => {
     setLoading(false);
     setTaskData({ description: "", title: "", user: null, country: null });
   };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasksFromAsyncStorage();
      setTaskList(tasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
     const getCountries = async () => {
       const countryNames = await fetchCountries();
       setCountries(countryNames);
     };

     getCountries();
    
  }, []);

    useEffect(() => {
      StatusBar.setBarStyle(
        theme === "dark" ? "light-content" : "dark-content"
      );
      StatusBar.setBackgroundColor(Colors[theme].background);
    }, [theme]);

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: Colors[theme].background }}
    >
      <Header />
      <ScrollView>
        <View style={styles.mainContent}>
          <ThemedText
            type="title"
            style={{ ...styles.title, color: Colors[theme].text }}
          >
            New Task
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={{ ...styles.subTitle, color: Colors[theme].text }}
          >
            Title
          </ThemedText>
          <TextInput
            placeholder="Title"
            placeholderTextColor={Colors[theme].text}
            value={taskData.title}
            onChangeText={(text) => setTaskData({ ...taskData, title: text })}
            maxLength={40}
            style={{ ...styles.input, color: Colors[theme].text }}
          />
          <ThemedText
            type="subtitle"
            style={{ ...styles.subTitle, color: Colors[theme].text }}
          >
            Description
          </ThemedText>
          <TextInput
            placeholder="Task Description (max 120 characters)"
            placeholderTextColor={Colors[theme].text}
            value={taskData.description}
            onChangeText={(text) =>
              setTaskData({ ...taskData, description: text })
            }
            maxLength={120}
            style={{ ...styles.input, color: Colors[theme].text }}
          />
          <ThemedText
            type="subtitle"
            style={{ ...styles.subTitle, color: Colors[theme].text }}
          >
            User
          </ThemedText>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={{ color: Colors[theme].text }}
            data={users.map((u) => ({ label: u, value: u }))}
            labelField="label"
            valueField="value"
            placeholder="Select User"
            value={taskData.user}
            onChange={(item) => setTaskData({ ...taskData, user: item.value })}
            placeholderStyle={{ color: Colors[theme].text }}
          />
          <ThemedText
            type="subtitle"
            style={{ ...styles.subTitle, color: Colors[theme].text }}
          >
            Country
          </ThemedText>
          <Dropdown
            mode="modal"
            style={styles.dropdown}
            selectedTextStyle={{ color: Colors[theme].text }}
            data={countries.map((c) => ({ label: c, value: c }))}
            labelField="label"
            valueField="value"
            placeholder="Select Country"
            value={taskData.country}
            onChange={(item) =>
              setTaskData({ ...taskData, country: item.value })
            }
            placeholderStyle={{ color: Colors[theme].text }}
          />
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: Colors[theme].button }}
            onPress={addTask}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <MaterialIcons
                  name="add-task"
                  size={24}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Create</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


