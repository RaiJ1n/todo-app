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


  const addTask = async (taskName) => {
    try {
      const response = await apiClient.post("/add/task", { todo: todo });
      taskList.value.push(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  const updateTask = async (taskId, taskName) => {
    try {
      const response = await apiClient.post("/update", { id: taskId, todo: taskName });
      const index = taskList.value.findIndex(task => task.id === taskId);
      if (index !== -1) {
        taskList.value[index] = response.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  const removeTask = async (taskId) => {
    try {
      await apiClient.post("/delete", { id: taskId });
      taskList.value = taskList.value.filter(task => task.id !== taskId);
    } catch (err) {
      console.log(err);
    }
  };

  
  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = taskList.value.find(task => task.id === taskId);
      if (task) {
        const response = await apiClient.post("/update", { id: taskId, completed: !task.completed });
        task.completed = response.data.completed;
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
