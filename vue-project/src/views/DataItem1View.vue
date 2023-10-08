
<script>
import axios from 'axios';

export default {
  data() {
    return {
      Label: '',
      Content: '',
    };
  },
  mounted() {
    axios
      .get('http://localhost:5000/api/getClassifierNameFromMongoDB')
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
      .get('http://localhost:5000/api/getClassifierFromMongoDB')
      .then(response => {
        if (response.data && response.data.classifier) {
          this.Content = response.data.classifier; 
        } else {
          console.error('Invalid API response for Classifier:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching Classifier:', error);
      });
  },
  methods: {
    async updateInfo() {
  try {
    const updateData = {};

    if (this.Label.trim() !== '') {
      updateData.name = this.Label;
    }

    if (this.Content.trim() !== '') {
      updateData.classifier = this.Content;
    }

    if (Object.keys(updateData).length > 0) {
      const response = await axios.put('http://localhost:5000/api/updateClassifier', updateData);

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

<template>
  <div class="container">
    <div class="items">
      <div class="box">
        <h2 class="box-heading"><b>Information</b></h2>
        <div>
          <label for="name">Label</label><br>
          <input placeholder="Information label" class="input-box" v-model="Label" type="text" id="name" name="name"><br><br>
          <label for="role-and-personality">Enter Information here</label><br>
          <textarea placeholder="Information content" class="text-area" v-model="Content" ref="autoTextArea" @input="autoResize" cols="30" rows="10"></textarea><br><br>
        </div>
      </div>
      <div class="bot">
        <button class="saveBtn" @click="updateInfo">Save Changes</button>
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

 