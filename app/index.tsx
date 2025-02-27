import { initializeUpdateTask } from "@/src/backgroundTask";
import { addListener, clearTaskLog, getTaskLog, TaskLog } from "@/src/storage";
import { checkForUpdates } from "@/src/updates";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

initializeUpdateTask();

export default function Index() {
  // Handle task log
  const [log, setLog] = useState<TaskLog[]>([]);
  useEffect(() => addListener(() => getTaskLog().then(setLog)), []);
  useEffect(() => {
    getTaskLog().then(setLog);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
      }}
    >
      <View
        style={{
          backgroundColor: "#00ffff",
          borderRadius: 4,
          width: 150,
          height: 25,
          gap: 10,
          marginBottom: 14,
        }}
      />
      <Text>Testing Expo Updates using BG Tasks</Text>
      <Button
        title="Check for updates"
        onPress={() => {
          checkForUpdates();
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          alignSelf: "stretch",
          backgroundColor: "white",
          margin: 14,
          padding: 14,
          borderColor: "#AAA",
          borderWidth: 1,
        }}
      >
        {log.map((item, index) => (
          <View key={index} style={{}}>
            <Text style={{ fontFamily: "monospace", fontSize: 11 }}>
              {new Date(item.timestamp).toLocaleString() + ": " + item.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: "row", gap: 14, marginBottom: 14 }}>
        <Button title="Clear log" onPress={clearTaskLog} />
        <Button title="Reload" onPress={() => getTaskLog().then(setLog)} />
      </View>
    </View>
  );
}
