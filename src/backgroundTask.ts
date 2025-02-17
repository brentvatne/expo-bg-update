import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import { appendTaskLog } from "@/src/storage";

const BACKGROUND_TASK_NAME = "task-run-expo-update";

/**
 * Initialize the expo update background task
 */
export const initializeUpdateTask = async () => {
  appendTaskLog(`Defining task "${BACKGROUND_TASK_NAME}"`);
  await TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    // This is the background task!
    appendTaskLog("Running background task...");
    appendTaskLog("Done running background task.");
  });
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_TASK_NAME
  );
  if (!isRegistered) {
    appendTaskLog(`Registering task "${BACKGROUND_TASK_NAME}"`);
    await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_NAME);
  } else {
    appendTaskLog(`Task "${BACKGROUND_TASK_NAME}" already registered.`);
  }
};
