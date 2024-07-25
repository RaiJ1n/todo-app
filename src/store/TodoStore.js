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
      const response = await apiClient.post("/add/task", { name: taskName }); 
      taskList.value.push(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    fetchTodo,
    taskList,
    addTask,
  };
}