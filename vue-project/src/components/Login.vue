<template>
    <div class="login-background">
      <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login" class="formcon">
          <div class="form-group">
            <label for="email">Email:</label><br>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label><br>
            <input type="password" id="password" v-model="password" required>
            <span v-if="incorrectCredentials" class="incorrect">Incorrect email or password</span>
          </div>
          <div class="form-group2">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref(''); 
    const password = ref('');
    const incorrectCredentials = ref(false);

    const login = async () => {
      try {
        const emailResponse = await fetch('https://uaai-api.vercel.app/api/getEmailFromMongoDB');
        const emailData = await emailResponse.json();
        const storedEmail = emailData.email;

        const passwordResponse = await fetch('https://uaai-api.vercel.app/api/getPasswordFromMongoDB');
        const passwordData = await passwordResponse.json();
        const storedPassword = passwordData.password;

        if (email.value && password.value) {
          if (email.value === storedEmail && password.value === storedPassword) {
            console.log('Login successful');
            await store.dispatch('login');
            console.log('isAuthenticated:', store.state.auth.isAuthenticated);

            router.push('/analytics');
          } else {
            console.log('Login failed');
            incorrectCredentials.value = true;
          }
        } else {
          console.log('Email and/or password are empty.');
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    return {
      email,
      password,
      incorrectCredentials,
      login,
    };
  },
};
</script>
  
  <style scoped>
  .login-background {
    background-color: #042134; 
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .login-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    width: 350px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  .formcon {
    text-align: left;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .form-group2 {
    margin-top: 10px;
    text-align: center;
  }
  
  input {
    width: 100%;
    height: 30px;
    border: 1px solid black;
    border-radius: 5px;
  }
  
  button {
    width: 100px;
    height: 30px;
    font-size: 12px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #364D5D;
    cursor: pointer;
  }
  .incorrect {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  </style>
  