import { ref } from "vue";
import apiClient from "@/config/axiosClient";

const taskList = ref([]);

export function useTodo() {
  const fetchTodo = async () => {
    try {
      const newUser = await apiClient.get("/list");
      taskList.value = newUser.data.content;
      
    } catch (err) {
      console.log(err);
    }
  };


  return {
    fetchTodo,
    taskList,
  };
}
