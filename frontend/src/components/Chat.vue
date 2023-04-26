<template>
    <div>
      <h1>Chat</h1>
      <div class="message-container">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div class="author">{{ message.author }}:</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="message" placeholder="Type your message here..." />
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  <script>
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  
  export default {
    name: 'Chat',
    data() {
      return {
        message: '',
        messages: [],
        projectId: this.$route.params.id,
        db: null,
      };
    },
    created() {
      firebase.initializeApp({
        // Initialize Firebase app with your credentials
        // ...
      });
      this.db = firebase.firestore();
  
      // Subscribe to new messages added to the database
      this.db.collection('messages').where('projectId', '==', this.projectId).orderBy('timestamp').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const message = change.doc.data();
            this.messages.push(message);
          }
        });
      });
    },
    methods: {
      sendMessage() {
        const message = {
          author: 'User',
          content: this.message,
          timestamp: new Date(),
          projectId: this.projectId,
        };
        this.db.collection('messages').add(message);
        this.message = '';
      },
    },
  };
  </script>
  <style scoped>
  .message-container {
    height: 300px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .author {
    font-weight: bold;
    display: inline-block;
    margin-right: 10px;
  }
  
  .content {
    display: inline-block;
  }
  </style>