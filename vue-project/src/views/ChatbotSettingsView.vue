
<script>
import axios from 'axios';

export default {
  data() {
    return {
      newName: '', 
      newRole: '', 
      newIntro: '', 
      newModel: '',
      newIntlimit: '',
      Image: '',
      sliderValue: 50,
    };
  },
  mounted() {
    axios
    .get('https://uaai-api.vercel.app/api/getNameFromMongoDB')
    .then(response => {
      console.log('ClassifierName API Response:', response.data);
      if (response.data && response.data.Name) {
        this.newName = response.data.Name;
      } else {
        console.error('Invalid API response for ClassifierName:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching ClassifierName:', error);
    });
    

    axios
    .get('https://uaai-api.vercel.app/api/getRoleFromMongoDB')
    .then(response => {
      console.log('ClassifierName API Response:', response.data);
      if (response.data && response.data.Role) {
        this.newRole = response.data.Role;
        this.adjustTextarea();
      } else {
        console.error('Invalid API response for ClassifierName:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching ClassifierName:', error);
    });

    axios
    .get('https://uaai-api.vercel.app/api/getIntroductionFromMongoDB')
    .then(response => {
      console.log('ClassifierName API Response:', response.data);
      if (response.data && response.data.Introduction) {
        this.newIntro = response.data.Introduction;
        this.adjustTextarea();
      } else {
        console.error('Invalid API response for ClassifierName:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching ClassifierName:', error);
    });

    axios
    .get('https://uaai-api.vercel.app/api/getModelFromMongoDB')
    .then(response => {
      console.log('ClassifierName API Response:', response.data);
      if (response.data && response.data.Model) {
        this.newModel = response.data.Model;
      } else {
        console.error('Invalid API response for ClassifierName:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching ClassifierName:', error);
    });

    axios
    .get('https://uaai-api.vercel.app/api/getIntlimitFromMongoDB')
    .then(response => {
      console.log('ClassifierName API Response:', response.data);
      if (response.data && response.data.Intlimit) {
        this.newIntlimit = response.data.Intlimit;
      } else {
        console.error('Invalid API response for ClassifierName:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching ClassifierName:', error);
    });

  },

  computed: {
    temperatureLevel() {
      if (this.sliderValue >= 0 && this.sliderValue <= 33) {
        return 'Low';
      } else if (this.sliderValue >= 34 && this.sliderValue <= 66) {
        return 'Average';
      } else {
        return 'High';
      }
    },
  },

  methods: {
    adjustTextarea() {
      const roleTextArea = this.$refs.roleTextarea;
      const introTextArea = this.$refs.introTextarea;
      roleTextArea.style.height = 'auto';
      roleTextArea.style.height = roleTextArea.scrollHeight + 'px';
      introTextArea.style.height = 'auto';
      introTextArea.style.height = introTextArea.scrollHeight + 'px';
    },
    async updateProfile() {
  try {
    const updateData = {};

    if (this.newName.trim() !== '') {
      updateData.Name = this.newName;
    }

    if (this.newRole.trim() !== '') {
      updateData.Role = this.newRole;
    }

    if (this.newIntro.trim() !== '') {
      updateData.Introduction = this.newIntro;
    }

    if (this.newModel.trim() !== '') {
      updateData.Model = this.newModel;
    }

    if (this.newIntlimit !== '' && !isNaN(this.newIntlimit)) {
      updateData.Intlimit = parseInt(this.newIntlimit, 10);
    }

    if (this.Image.trim() !== '') {
      updateData.Image = this.Image;
    }

    updateData.Temperature = this.temperatureLevel;


    if (Object.keys(updateData).length > 0) {
      const response = await axios.put('https://uaai-api.vercel.app/api/updateProfile', updateData);

      console.log('Profile updated successfully:', response.data);
    } else {
      console.log('No fields to update.');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
  },

  },
};
</script>

<template>
  <div class="container">
    <div class="items">
      <div class="box">
        <h2 class="box-heading"><b>AI Profile</b></h2>
        <div>
          <label for="name">Name</label><br>
          <input placeholder="AI name here" class="input-box" type="text" id="name" name="name" v-model="newName"><br><br> 
          <label for="role">Role</label><br>
          <textarea placeholder="Enter AI Role." ref="roleTextarea" @input="adjustTextarea" class="text-area" name="" id="" v-model="newRole"></textarea><br><br>
          <label for="introduction-message">Introduction Message</label><br>
          <textarea placeholder="Enter AI introduction message." ref="introTextarea" @input="adjustTextarea" class="text-area" name="" id="" v-model="newIntro"></textarea><br><br>
          <label for="imageSelect">Profile image:</label> <br> 
          <select class="select-img" id="imageSelect" v-model="Image">
              <option value="stacy.png">Stacy</option>
              <option value="stanley.png">Stanley</option>
              <option value="UA-Logo.png">Ua Logo</option>
            </select>
        </div>
      </div>

      <div class="box box-padding">
        <h2 class="box-heading"><b>Model Configuration</b></h2>
        <div class="setting-content">
          <div class="box-row">
            <span>
              <label for="model">AI Model</label><br>
              <input class="input-box" type="text" id="model" name="model" v-model="newModel">
            </span>
            <span>
              <label for="limit">Interaction limit</label><br>
              <input class="input-box" type="number" id="limit" name="limit" v-model="newIntlimit">
            </span>
          </div> <br>
          
          <div class="tempval">
            <p>Temperature:</p>
            <p class="temp">{{ temperatureLevel }}</p>
          </div>
          <div class="slider-container">
            <input type="range" class="slider" min="0" max="100" id="volumeSlider" v-model="sliderValue">
          </div>
        </div>
      </div>

      <div class="bot">
        <button class="saveBtn" @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

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

.bot{
  display: flex;
  justify-content: right;
}
.tempval {
  display: flex;
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

.bot{
  display: flex;
  justify-content: right;
}

.items{
  display: flex;
  flex-direction: column;
}
 


.box-content{
  text-align: left;
}

.edit {
  background-color: white;
  padding: 6px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.edit-icon:hover {
  color: white;
}

input{
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
}

.box-row{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

 
 
.upload-img{
  border: 1px solid #ccc; 
  padding: 5px; 
  height: 100% ;
  margin: .5rem 0 0 0 

}

</style>

 