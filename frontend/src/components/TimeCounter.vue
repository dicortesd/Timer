<template>
  <div>
    <h3>{{ task.name }}</h3>
    <div>Time: {{ timeString }}</div>
    <button v-if="!timerRunning" @click="startTimer">Start</button>
    <button v-if="timerRunning" @click="stopTimer">Stop</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    id_usuario:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      timerRunning: false,
      startTime: 0,
      elapsedTime: 0,
      timerInterval: null,
      timeSession: 0
    };
  },
  computed: {
    timeString() {
      const totalSeconds = Math.floor((Number(this.timeSession) + Number(this.elapsedTime)) / 1000);
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
    stopTimer: async function() {
      this.timerRunning = false;
      clearInterval(this.timerInterval);
      const updatedTask = { ...this.task, time: Math.round(this.task.time + (this.elapsedTime/1000))};
      this.$emit("update:task", updatedTask);
      this.timeSession += this.elapsedTime;
      let formatedStartTime =new Date(this.startTime).toISOString();
      let formatedEndTime =new Date(this.startTime + this.elapsedTime).toISOString();
      formatedStartTime=formatedStartTime.replace(/^([0-9:\-.]*)T([0-9:\-.]*)Z$/,'$1 $2');
      formatedEndTime=formatedEndTime.replace(/^([0-9:\-.]*)T([0-9:\-.]*)Z$/,'$1 $2');
      this.elapsedTime=0;
      console.log(formatedStartTime);
      console.log(formatedEndTime);
      console.log(this.task.id);
      console.log(this.id_usuario);
      let tiempo = {
        id_tarea: this.task.id,
        inicio: formatedStartTime,
        final: formatedEndTime,
        id_usuario: this.id_usuario
      }
      console.log(tiempo);
      const response = await axios.post('http://localhost:3000/tiempos/', tiempo);
      console.log(response);
    },
    updateTime() {
      this.elapsedTime = Date.now() - this.startTime;
    }
  },
};
</script>
