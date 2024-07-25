import { ref } from "vue";
import apiClient from "@/config/axiosClient";

const taskList = ref([]); 

export function useTodo() {
  
  const fetchTodo = async () => {
    try {
      const response = await apiClient.get("/todo");
      taskList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };


  const addTask = async (todo) => {
    console.log(todo);
    try {
      await apiClient.post("/add/task", { todo: todo });
      await fetchTodo()
    } catch (err) {
      console.log(err);
    }
  };

  
  const updateTask = async (taskId, todo) => {
    try {
      await apiClient.post("/update", { id: taskId, todo: todo });
      await fetchTodo(); 
    } catch (err) {
      console.log(err);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await apiClient.post("/delete", { id: taskId });
      await fetchTodo(); 
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = taskList.value.find(task => task.id === taskId);
      if (task) {
        await apiClient.post("/update", { id: taskId, completed: !task.completed });
        await fetchTodo(); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    fetchTodo,
    taskList,
    addTask,
    updateTask,
    removeTask,
    toggleTaskCompletion
  };
}
