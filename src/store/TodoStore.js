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
      const response = await apiClient.post("/add/task", { todo: todo });
      console.log(response);
      await fetchTodo()
    } catch (err) {
      console.log(err);
    }
  };

  
  const updateTask = async (id, todo) => {
    
    console.log("Updating task:", id, todo);
    try {
      const response = await apiClient.post("/update", id, { todo: todo });
      
      if (response.status === 204) {
        console.log("No content");
      } else {
        if (response.data) {
          console.log("Response data:", response.data);
        } else {
          console.log("Response data is undefined or empty.");
        }
      }
      
      await fetchTodo(); 
    } catch (err) {
      console.error("Error in updateTask:", err);
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
