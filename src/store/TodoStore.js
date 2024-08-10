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

  // const toggleTaskCompletion = async (todoId) => {
  //   console.log(todoId);
    
  //   try {
  //     const todoId = taskList.value.find(task => task.id === todoId); 
  //     console.log(todo); 
  //     if (todoId) {
  //       await apiClient.post("/update", {
  //         id: todoId,
  //         todo: { ...todo, isfinished: !todo.isfinished },
  //       });
  //       await fetchTodo();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const toggleTaskCompletion = async (todoId) => {
    console.log("Task ID:", todoId);
    
    try {
        console.log("Current Task List:", taskList.value);
        
        const todo = taskList.value.find(task => task._id === todoId); 
        console.log("Found Task:", todo); 

        if (todo) {
            const response = await apiClient.post("/toggle-completion", {
                todoId: todoId,
            });
            console.log("API Response:", response);
            
            await fetchTodo();
            console.log("Updated Task List:", taskList.value);
        } else {
            console.error('Task not found');
        }
    } catch (err) {
        console.error(err);
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