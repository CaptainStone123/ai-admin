<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  components: {
    Sidebar,
    Navbar,
  },
  setup() {
    const currentEmail = ref('');
    const newEmail = ref('');
    const confirmemail = ref('');
    const currentPassword = ref('');
    const newPass = ref('');
    const confirmpass = ref('');
    const emailError = ref('');
    const passwordError = ref('');

    const store = useStore();
    const router = useRouter();

    const updateInfo = async () => {
      this.emailError = '';
      this.passwordError = '';

      try {
        const response = await fetch('https://uaai-api.vercel.app/api/updateAccount', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentEmail: this.currentEmail,
            newEmail: this.newEmail,
            confirmemail: this.confirmemail,
            currentPassword: this.currentPassword,
            newPass: this.newPass,
            confirmpass: this.confirmpass,
          }),
        });

        if (response.ok) {
          this.currentEmail = '';
          this.newEmail = '';
          this.confirmemail = '';
          this.currentPassword = '';
          this.newPass = '';
          this.confirmpass = '';

        } else {
          const data = await response.json();

          if (data.error) {
            if (data.error === 'Invalid email or password') {
              this.emailError = data.error;
              this.passwordError = data.error;
            } else {
              this.emailError = data.error;
            }
          }
        }
      } catch (error) {
        console.error('Error updating account:', error);
      }
    };

    const logout = async () => {
      try {
        if (store) {
          await store.dispatch('logout');
          console.log('isAuthenticated:', store.state.auth.isAuthenticated);
        } else {
          console.error('Store is not available.');
        }

        if (router) {
          router.push('/');
        } else {
          console.error('Router is not available.');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };


    return {
      currentEmail,
      newEmail,
      confirmemail,
      currentPassword,
      newPass,
      confirmpass,
      emailError,
      passwordError,
      updateInfo,
      logout,
    };
  },
};
</script>

<template>
<div class="navside">
  <Navbar/>
  <Sidebar/>
  <div class="container">
    <div class="items">
      <div class="box">
        <h1 class="box-heading"><b>Account</b></h1>
        <div class="accountInfo">
          <div class="emailcon">
            <label for="email">Email:</label><br>
            <input placeholder="Email" class="input-box" v-model="currentEmail" type="text" id="email" name="email"><br><br>
            <label for="newemail">New Email:</label><br>
            <input placeholder="New email" class="input-box" v-model="newEmail" type="text" id="newemail" name="newemail"><br><br>
            <label for="emailconfirm">Re-Enter New Email:</label><br>
            <input placeholder="Re-enter new email" class="input-box" v-model="confirmemail" type="text" id="emailconfirm" name="emailconfirm"><br><br>
            <span class="error-message" v-if="emailError">{{ emailError }}</span>
          </div>
          <div class="passcon">
            <label for="password">Password:</label><br>
            <input placeholder="Password" class="input-box" v-model="currentPassword" type="text" id="password" name="password"><br><br>
            <label for="newpass">New Password:</label><br>
            <input placeholder="New password" class="input-box" v-model="newPass" type="text" id="newpass" name="newpass"><br><br>
            <label for="passconfirm">Re-Enter New Password:</label><br>
            <input placeholder="Re-enter new password" class="input-box" v-model="confirmpass" type="text" id="passconfirm" name="passconfirm"><br><br>
            <span class="error-message" v-if="passwordError">{{ passwordError }}</span>
          </div>
        </div>
      </div>
      <div class="bot">
        <button class="saveBtn" @click="updateInfo">Save Changes</button>
        <button class="logoutBtn" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

.container {
  display: flex;
  justify-content: center;
}
.saveBtn {
  width: 100px;
  height: 30px;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 50px;
  border-radius: 5px;
  background-color: white;;
  border: 1px solid #364D5D;
  cursor: pointer;
}

.logoutBtn {
  width: 100px;
  height: 30px;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 50px;
  margin-left: 10px;
  border-radius: 5px;
  color: white;
  background-color: #003075;
  cursor: pointer;
}

.accountInfo {
  display: flex;
  justify-content: space-between;
}
.bot{
  display: flex;
  justify-content: right;
}

.items {
  margin-right: 5%;
  width: 550px;
}

input{
  width: 100%;
  height: 20px;
  margin-bottom: -10px;
}
</style>

 