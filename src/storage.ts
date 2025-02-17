import AsyncStorage from "@react-native-async-storage/async-storage";

const listeners: Array<() => void> = [];

export const addListener = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
};

const notify = () => {
  listeners.forEach((listener) => listener());
};

export type TaskLog = { timestamp: number; message: string };

export const appendTaskLog = async (message: string) => {
  const taskList = await getTaskLog();
  taskList.push({ timestamp: Date.now(), message });
  await AsyncStorage.setItem("tasks", JSON.stringify(taskList));
  console.log(message);
  notify();
};

export const clearTaskLog = async () => {
  await AsyncStorage.removeItem("tasks");
  notify();
};

export const getTaskLog = async () => {
  const tasks = await AsyncStorage.getItem("tasks");
  const taskList: TaskLog[] = tasks ? JSON.parse(tasks) : [];
  return taskList;
};
