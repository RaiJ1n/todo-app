import { ref } from 'vue';

const taskList = ref([]);

const addTask = (taskName) => {
    if (taskName.trim() !== '') {
        const newTask = {
            id: Date.now(),
            name: taskName.trim(),
            isCompleted: false,
        };
        taskList.value.push(newTask);
    }
};

const updateTask = (taskId, updatedName) => {
    if (updatedName.trim() !== '') {
        taskList.value = taskList.value.map(task =>
            task.id === taskId ? { ...task, name: updatedName.trim() } : task
        );
    }
};

const removeTask = (taskId) => {
    taskList.value = taskList.value.filter(task => task.id !== taskId);
};

const toggleTaskCompletion = (taskId) => {
    taskList.value = taskList.value.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
};

const getTaskList = () => taskList;

export default {
    addTask,
    updateTask,
    removeTask,
    toggleTaskCompletion,
    getTaskList,
};
