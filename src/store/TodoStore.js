import { ref } from "vue";
import apiClient from "@/config/axiosClient";

const taskList = ref([]);

export function useTodo() {
  const fetchTodo = async () => {
    try {
      const response = await apiClient.get("/all/task");
      taskList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (taskName) => {
    try {
      
      await apiClient.post("/add/task", { name: todo });
      await fetchTodo(); 
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (id, newName) => {
    try {
      
      await apiClient.put(`/task/${id}`, { name: newName });
      await fetchTodo(); // Refresh task list
    } catch (err) {
      console.log(err);
    }
  };

  const removeTask = async (id) => {
    try {
      // Assuming you have an endpoint to remove tasks
      await apiClient.delete(`/task/${id}`);
      await fetchTodo(); // Refresh task list
    } catch (err) {
      console.log(err);
    }
  };

  // const toggleTaskCompletion = async (id) => {
  //   try {
  //     // Assuming you have an endpoint to toggle task completion
  //     await apiClient.patch(`/task/${id}/toggle`);
  //     await fetchTodo(); // Refresh task list
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return {
    fetchTodo,
    taskList,
    addTask,
    updateTask,
    removeTask,
    // toggleTaskCompletion
  };
}
