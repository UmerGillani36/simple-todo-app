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
import { Task } from "@/types/types";
import {
  getTasksFromAsyncStorage,
  saveTasksToAsyncStorage,
} from "@/helper/helper";
import Header from "@/components/Header";
import { users } from "@/constants/Constants";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { styles } from "@/styles/homeStyles";

export default function HomeScreen() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const { theme } = useTheme();

  const addTask = async () => {
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
    setTitle("");
    setDescription("");
    setUser(null);
    setCountry(null);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasksFromAsyncStorage();
      setTaskList(tasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryNames = response?.data?.map((c: any) => c.name.common);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error(error);
      });
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
            value={title}
            onChangeText={setTitle}
            maxLength={40}
            style={styles.input}
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
            value={description}
            onChangeText={setDescription}
            maxLength={120}
            style={styles.input}
            selectionColor={"black"}
          />
          <ThemedText
            type="subtitle"
            style={{ ...styles.subTitle, color: Colors[theme].text }}
          >
            User
          </ThemedText>
          <Dropdown
            style={styles.dropdown}
            data={users.map((u) => ({ label: u, value: u }))}
            labelField="label"
            valueField="value"
            placeholder="Select User"
            value={user}
            onChange={(item) => setUser(item.value)}
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
            data={countries.map((c) => ({ label: c, value: c }))}
            labelField="label"
            valueField="value"
            placeholder="Select Country"
            value={country}
            onChange={(item) => setCountry(item.value)}
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


