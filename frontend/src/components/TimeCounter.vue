<template>
  <div>
    <h3>{{ task.name }}</h3>
    <div>Time: {{ timeString }}</div>
    <button v-if="!timerRunning" @click="startTimer">Start</button>
    <button v-if="timerRunning" @click="stopTimer">Stop</button>
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
      timerRunning: false,
      startTime: 0,
      elapsedTime: 0,
      timerInterval: null,
    };
  },
  computed: {
    timeString() {
    const totalSeconds = Math.floor((this.task.time + this.elapsedTime) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
},

  },
  methods: {
    startTimer() {
      this.timerRunning = true;
      this.startTime = Date.now();
      this.timerInterval = setInterval(this.updateTime, 1000);
    },
    stopTimer() {
      this.timerRunning = false;
      clearInterval(this.timerInterval);
      const updatedTask = { ...this.task, time: this.task.time + this.elapsedTime };
      this.$emit("update:task", updatedTask);
    },
    updateTime() {
      this.elapsedTime = Date.now() - this.startTime;
      console.log(this.elapsedTime);
    },
  },
};
</script>
