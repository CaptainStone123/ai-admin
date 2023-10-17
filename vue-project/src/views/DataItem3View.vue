<template>
  <div class="navside">
    <Navbar/>
    <Sidebar/>
    <div class="container">
      <div class="content">
        <div class="box">
          <h2 class="box-heading"><b>Information</b></h2>
          <div>
            <label for="name">Label</label><br>
            <input placeholder="Information label" class="input-box" v-model="Label" type="text" id="name" name="name"><br><br>
            <label for="role-and-personality">Enter Information here</label><br>
            <textarea placeholder="Information content" class="text-area" v-model="Content"  ref="contentTextarea"
            @input="adjustTextarea"></textarea><br><br>
          </div>
        </div>
        <div class="bot">
          <button class="secondary-button-save" @click="updateInfo">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <style scoped>
  .bot{
    display: flex;
    justify-content: right;
  }
  
  input{
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
  }
  
  /* .text-area {
    resize: none;
    overflow-y: hidden;
  } */
  
  </style>
  
  
  <script>
  import Sidebar from '../components/Sidebar.vue'
  import Navbar from '../components/Navbar.vue'
  import axios from 'axios';
  
  export default {
    components: {
      Sidebar,
      Navbar,
    },
    data() {
      return {
        Label: '',
        Content: '',
      };
    },
    mounted() {
      axios
        .get('https://uaai-api.vercel.app/api/getClassNameFromMongoDB/about_ua')
        .then(response => {
          console.log('ClassifierName API Response:', response.data);
          if (response.data && response.data.name) {
            this.Label = response.data.name;
          } else {
            console.error('Invalid API response for ClassifierName:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching ClassifierName:', error);
        });
    
      axios
        .get('https://uaai-api.vercel.app/api/getAboutUAFromMongoDB')
        .then(response => {
          if (response.data && response.data.about) {
            this.Content = response.data.about; 
            this.$nextTick(() => {
              this.adjustTextarea();
            });
          } else {
            console.error('Invalid API response for Classifier:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching Classifier:', error);
        });
    },
    methods: {
      adjustTextarea() {
      const textarea = this.$refs.contentTextarea;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    },
      async updateInfo() {
    try {
      const updateData = {};
  
      if (this.Label.trim() !== '') {
        updateData.name = this.Label;
      }
  
      if (this.Content.trim() !== '') {
        updateData.about = this.Content;
      }
  
      if (Object.keys(updateData).length > 0) {
        const response = await axios.put('https://uaai-api.vercel.app/api/updateAbout', updateData);
  
        console.log('information updated successfully:', response.data);
      } else {
        console.log('No fields to update.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      }
    },
    }
  };
  </script>