<template>
  <div class="task-table">
    <h2>Tasks</h2>
    <div class="task-container">
      <div v-for="(task, index) in tasks" :key="index" class="task-square">
        <div class="task-header">
          <span class="task-name">{{ task.name }}</span>
          <time-counter :task="task" :key="task.name" @update:task="updateTask" class="task-time-counter"></time-counter>
        </div>
        <div class="task-body">
          {{ task.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeCounter from "./TimeCounter.vue";

export default {
  components: {
    TimeCounter,
  },
  data() {
    return {
      tasks: [
        { name: "Task 1", time: 0 },
        { name: "Task 2", time: 0 },
        { name: "Task 3", time: 0 },
      ],
    };
  },
  methods: {
    updateTask(updatedTask) {
      let taskIndex = this.tasks.findIndex((task) => task.name === updatedTask.name);
      this.tasks[taskIndex].time = updatedTask.time;
    },
  },
};
</script>

<style scoped>
.task-table {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.task-square {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 200px;
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  background-color: #f1f1f1;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.task-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.task-time-counter {
  font-size: 1.2rem;
}

.task-body {
  font-size: 1.2rem;
  text-align: center;
  color: #666;
}
</style>
