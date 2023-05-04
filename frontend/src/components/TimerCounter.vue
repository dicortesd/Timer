<template>
    <div>
      <span>{{ formatTime }}</span>
      <button @click="startTimer">Start</button>
      <button @click="pauseTimer">Pause</button>
      <button @click="resetTimer">Reset</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        elapsedTime: this.task.time,
        startTime: null,
        timerId: null,
      };
    },
    computed: {
      formatTime() {
        let totalSeconds = Math.floor(this.elapsedTime / 1000);
        let minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
        let seconds = (totalSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
      },
    },
    methods: {
      startTimer() {
        this.startTime = Date.now() - this.elapsedTime;
        this.timerId = setInterval(() => {
          this.elapsedTime = Date.now() - this.startTime;
        }, 1000);
      },
      pauseTimer() {
        clearInterval(this.timerId);
        this.task.time = this.elapsedTime;
      },
      resetTimer() {
        this.elapsedTime = 0;
        this.startTime = null;
        clearInterval(this.timerId);
        this.task.time = 0;
      },
    },
  };
  </script>
  
  