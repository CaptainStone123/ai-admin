<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import axios from 'axios';

export default {
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      // baseUrl:'https://ua-ai-llm.vercel.app',
      baseUrl: 'http://localhost:3000',
      session: null
    };
  },
  created() {
    const customId = this.$route.params.customId; // Use this.$route.params.customId to get the customId
    axios.get(this.baseUrl + '/api/getSessionDetails/' + customId)
      .then(response => {
        this.session = response.data;
      })
      .catch(error => {
        console.error('Error fetching session details:', error);
      });
  }
};
</script>

<template>
  <div class="navside">
    <Sidebar/>
    <Navbar/>
    <div class="container">
      <div class="session-details-box">
        <div class="session-details">
          <div v-for="message in session.details" :key="message._id.$oid" class="message">
            <p class="role">{{ message.role }}:</p>
            <p class="content" v-html="message.content"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
  </style>
  
 