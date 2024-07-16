import { reactive, toRefs } from "vue";

const state = reactive({
  taskList: []
});

export default function useTodo() {
  const addTask = (taskName) => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: Date.now(),
        name: taskName.trim(),
        isCompleted: false,
      };
      state.taskList.push(newTask);
    }
  };

  const updateTask = (taskId, updatedName) => {
    if (updatedName.trim() !== '') {
      state.taskList = state.taskList.map(task => 
        task.id === taskId ? { ...task, name: updatedName.trim() } : task
      );
    }
  };

  const removeTask = (taskId) => {
    state.taskList = state.taskList.filter(task => task.id !== taskId);
  };

  const toggleTaskCompletion = (taskId) => {
    state.taskList = state.taskList.map(task => 
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
  };

  const getTaskList = () => state.taskList;

  return {
    ...toRefs(state),
    addTask,
    updateTask,
    removeTask, 
    toggleTaskCompletion,
    getTaskList
  };
}
