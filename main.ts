import { getTasks, startTaskById, stopStartedTasks, Task } from "./task.ts";
import { tasksMenuFactory } from "./task.ts";
import { getWofiOut } from "./wofi.ts";

const { activeTasks } = await getTasks();
const selectedItem = await getWofiOut(tasksMenuFactory(activeTasks));

const selectedTaskId = Number(
  (selectedItem).match(/<(\d+)>/)?.[1],
);

const selectedTask = activeTasks.find((task: Task) =>
  task.id === selectedTaskId
);

console.log(selectedTask);

if (selectedTask === undefined) {
  console.error("Selected task not found");
  Deno.exit(1);
}

await stopStartedTasks(activeTasks);
await startTaskById(selectedTask.id);
