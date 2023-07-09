const TASK_CMD = "task";
const TASK_ARGS_EXPORT = ["export"];
const TASK_ARGS_START = ["start"];
const TASK_ARGS_STOP = ["stop"];

export type Task = {
  id: number;
  description: string;
  status: string;
  entry: string;
  start: string;
  end: string;
  modified: string;
  uuid: string;
  urgency: number;
  project: string;
  priority: string;
};

export const getTasks = async () => {
  const command = new Deno.Command(TASK_CMD, {
    args: TASK_ARGS_EXPORT,
  });

  const { code, stdout } = await command.output();

  const exportTasks: Array<Task> = JSON.parse(new TextDecoder().decode(stdout));
  const activeTasks: Array<Task> = exportTasks.filter((task: Task) =>
    task.status === "pending"
  );

  return {
    activeTasks,
    exportTasks,
  };
};

export const stopStartedTasks = async (tasks: Array<Task>) => {
  const startedTasks = tasks.filter((task: Task) => task.start);
  for await (const task of startedTasks) {
    const taskStop = new Deno.Command(TASK_CMD, {
      args: [...TASK_ARGS_STOP, String(task.id)],
    });
    await taskStop.output();
  }
};

export const tasksMenuFactory = (tasks: Array<Task>) =>
  tasks.map((task: Task) =>
    `<${task.id}> ${task.description}${
      task.project ? ` [${task.project}]` : ""
    }`
  ).join("\n");

export const startTaskById = async (id: number) => {
  const taskStart = new Deno.Command(TASK_CMD, {
    args: [...TASK_ARGS_START, String(id)],
  });

  await taskStart.output();
};
