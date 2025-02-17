import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";

const BACKGROUND_TASK_NAME = "task-run-expo-update";

/**
 * Initialize the expo update background task
 */
export const initializeUpdateTask = async () => {
  console.log(`Defining task "${BACKGROUND_TASK_NAME}"`);
  await TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {});
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_TASK_NAME
  );
  if (!isRegistered) {
    console.log(`Registering task "${BACKGROUND_TASK_NAME}"`);
    await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_NAME);
  } else {
    console.log(`Task "${BACKGROUND_TASK_NAME}" already registered.`);
  }
};
