<template>
    <div>
      <h2>Tasks</h2>
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          {{ task.name }} - {{ task.time }}<br>
          <time-counter :task="task"></time-counter>
        </li>
      </ul>
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
          {
            name: "Task 1",
            time: 0,
          },
          {
            name: "Task 2",
            time: 0,
          },
        ],
      };
    },
  };
  </script>
  