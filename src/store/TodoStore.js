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
      await fetchTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (todoId, todo) => {
    console.log(todoId);
    try {
      const response = await apiClient.post("/update", {
        id: todoId,
        todo: todo,
      });

      if (response.status === 204) {
        console.log(response);
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

  const toggleTaskCompletion = async (todoId) => {
    try {
      const todo = taskList.value.find(task => task.id === todoId); 
      console.log(todo); 
      if (todo) {
        await apiClient.post("/update", {
          id: todoId,
          todo: { ...todo, isfinished: !todo.isfinished },
        });
        await fetchTodo();
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  
  

  const removeTask = async (todoId) => {  
    try {
      await apiClient.post(`/delete/${todoId}`);
      await fetchTodo();
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
    toggleTaskCompletion,
  };
}