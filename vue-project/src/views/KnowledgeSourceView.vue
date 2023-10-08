
<script>
import axios from 'axios';

  export default {
    data() {
      return {
        classify: '',
        faq: '',
        about: '', 
        admissions: '', 
        academics: '', 
      }
    },
    mounted() {
      axios
      .get('http://localhost:5000/api/getClassifierNameFromMongoDB')
      .then(response => {
        console.log('ClassifierName API Response:', response.data);
        if (response.data && response.data.name) {
          this.classify = response.data.name;
        } else {
          console.error('Invalid API response for ClassifierName:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching ClassifierName:', error);
      });

      axios
      .get('http://localhost:5000/api/getClassNameFromMongoDB/frequently_asked')
      .then(response => {
        if (response.data && response.data.name) {
          this.faq = response.data.name;
        } else {
          console.error('Invalid API response for FAQ:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching FAQ:', error);
      });

      axios
      .get('http://localhost:5000/api/getClassNameFromMongoDB/about_ua')
      .then(response => {
        if (response.data && response.data.name) {
          this.about = response.data.name;
        } else {
          console.error('Invalid API response for about:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching about:', error);
      });

      axios
      .get('http://localhost:5000/api/getClassNameFromMongoDB/admissions')
      .then(response => {
        if (response.data && response.data.name) {
          this.admissions = response.data.name;
        } else {
          console.error('Invalid API response for admissions:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching admissions:', error);
      });

      axios
      .get('http://localhost:5000/api/getClassNameFromMongoDB/academics')
      .then(response => {
        if (response.data && response.data.name) {
          this.academics = response.data.name;
        } else {
          console.error('Invalid API response for academics:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching academics:', error);
      });
    },
  }
</script>

<template>
  <div class="container">

    <div class="content">

    <div class="box">
      <h2 class="box-heading"><b>Classifier</b></h2>
      <div class="box-content">
        <table>
        <thead>
          <tr>
            <th width="10%">No.</th>
            <th width="20%">Tokens</th>
            <th width="50%">Label</th>
            <th width="20%"> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td >1.</td>
            <td >365</td>
            <td >{{ classify }}</td>
            <td class="details-btn-td"><button class="details-tbn"><RouterLink to="/knowledge-source/data-item-1">Edit</RouterLink></button></td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
    

    <div class="box">
      <h2 class="box-heading"><b>Knowledge Base</b></h2>
      <div class="box-content">
        <table>
          <thead>
            <tr>
                <th width="10%">ID.</th>
                <th width="20%">Tokens.</th>
                <th width="20%">Code.</th>
                <th width="30%">Label</th>
                <th width="20%" > </th>
             </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>3641</td>
              <td>one_111</td>
              <td>{{ faq }}</td>
              <td class="details-btn-td"><button class="details-tbn"><RouterLink to="/knowledge-source/data-item-2">Edit</RouterLink></button></td>
            </tr>
            <tr>
              <td>2.</td>
              <td>12696</td>
              <td>two_222</td>
              <td>{{ about }}</td>
              <td class="details-btn-td"><button class="details-tbn"><RouterLink to="/knowledge-source/data-item-3">Edit</RouterLink></button></td>
            </tr>
            <tr>
              <td>3.</td>
              <td>8779</td>
              <td>three_333</td>
              <td>{{ admissions }}</td>
              <td class="details-btn-td"><button class="details-tbn"><RouterLink to="/knowledge-source/data-item-4">Edit</RouterLink></button></td>
            </tr>
            <tr>
              <td>4.</td>
              <td>3437</td>
              <td>four_444</td>
              <td>{{ academics }}</td>
              <td class="details-btn-td"><button class="details-tbn"><RouterLink to="/knowledge-source/data-item-5">Edit</RouterLink></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
 
 
  </div>

  </div>
</template>

<style scoped>
</style>
