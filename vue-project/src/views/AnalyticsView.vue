<template>
  <div class="navside">
    <Sidebar/>
    <Navbar/>
    <div class="container">
      <div class="items">
        <section class="box">
          <span>
            <label for="datepicker"><b>Select Date </b></label>
            <input class="date-input" type="date" id="datepicker" name="selectedDate" v-model="selectedDate">
          </span>
        </section>
  
        <section class="analytics-box1">
          
        <form class="user-engagement">
          <dl>
            <span class="ue-row1">
                <dt><b>Sessions: </b></dt>
                <dd><b>{{ SessionCount }}</b></dd>    
            </span>
      
            <span class="ue-row2">
              <dt>No. user inquiries:</dt>
              <dd>{{ DurationCount }}</dd>
            </span>
            
            <span class="ue-row2">
              <dt>Average Session Duration:</dt>
              <dd>{{ AverageDuration }}</dd>
            </span>
        
          </dl>
        </form>
        <form class="keywords">
          <h2 class="box-heading"><b>Top Keywords</b></h2>
          <div class="keyword-columns">
            <div class="keyword-column">
              <span class="keyword-item" v-for="(keyword, index) in topKeywords.slice(0, 5)" :key="keyword._id">
                <ul>
                  <li>{{ index + 1 }}.</li>
                  <li>{{ keyword.count }}</li>
                  <li>{{ keyword._id }}</li>
                </ul>
              </span>
            </div>
            <div class="keyword-column">
              <span class="keyword-item" v-for="(keyword, index) in topKeywords.slice(5, 10)" :key="keyword._id">
                <ul>
                  <li>{{ index + 6 }}.</li>
                  <li>{{ keyword.count }}</li>
                  <li>{{ keyword._id }}</li>
                </ul>
              </span>
            </div>
          </div>
        </form>
      </section>
  
      <section class="analytics-box2">
        <div class="box">
          <h2 class="box-heading"><b>Records</b></h2>
          <table>
            <thead>
              <tr>
                  <th width="10%">No.</th>
                  <!-- <th width="20%">Session ID</th> -->
                  <th width="20%">Duration</th>
                  <th width="70%">Details</th>
                  <!-- <th width="20%" > </th> -->
               </tr>
            </thead>
            <tbody>
              <tr v-for="(session, index) in filteredSessions" :key="session.customId">
                <td>{{ index + 1 }}</td>
                <!-- <td>{{ session.customId }}</td> -->
                <td>{{ session.duration }}</td>
                <td>
                  <ul>
                    <li v-for="(detail, detailIndex) in sortedDetails[index]" :key="detailIndex">
                      • {{ detail.content }}
                    </li>

                    <!--Unorderdered by length but ordered in a way sa pagkakasunodsunod ng message to-->
                    <!-- <li v-for="(detail, detailIndex) in session.details" :key="detailIndex">
                      • {{ detail.content }}
                    </li> -->
                  </ul>
                </td>
                <!-- <td class="details-btn-td"><button class="details-tbn">view</button></td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </section>
  
      </div>
     
    </div>
  </div>
  </template>
  
  <script>
  import Sidebar from '../components/Sidebar.vue'
  import Navbar from '../components/Navbar.vue'
  import axios from 'axios';
  
  export default {
    components: {
      Sidebar,
      Navbar,
    },
    components: {
      Sidebar,
      Navbar,
    },
    data() {
      return {
        sessions: [],
        SessionCount: '',
        DurationCount: '',
        AverageDuration: '',
        selectedDate: null,
        topKeywords: [],
        topTen: 10,
      };
    },
    created() {
      axios.get('https://uaai-api.vercel.app/api/getAllSessions')
      .then(response => {
          this.sessions = response.data;
          this.calculateDurationCount();
        })
        .catch(error => {
          console.error('Error fetching sessions:', error);
        });
      
      axios.get('https://uaai-api.vercel.app/api/getKeywords')
      .then(response => {
        this.topKeywords = response.data.sort((a, b) => b.count - a.count);
        })
        .catch(error => {
          console.error('Error fetching sessions:', error);
        });
    },
    mounted() {
      axios
        .get('https://uaai-api.vercel.app/api/SessionCount')
        .then(response => {
          console.log('SessionCount API Response:', response.data);
          if (response.data && response.data.count) {
            this.SessionCount = response.data.count;
            this.calculateAverageDuration();
          } else {
            console.error('Invalid API response for SessionCount:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching SessionCount:', error);
        });
    },
    computed: {
      filteredSessions() {
      if (!this.selectedDate) {
        return this.sessions;
      }
  
      const selectedDate = new Date(this.selectedDate);
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedDay = selectedDate.getDate();
  
      return this.sessions.filter((session) => {
        const sessionDate = new Date(session.date);
        const sessionYear = sessionDate.getFullYear();
        const sessionMonth = sessionDate.getMonth() + 1;
        const sessionDay = sessionDate.getDate();
  
        return (
          selectedYear === sessionYear &&
          selectedMonth === sessionMonth &&
          selectedDay === sessionDay
        );
      });
      },

      sortedDetails() {
        return this.filteredSessions.map((session) => {
          const sortedDetails = [...session.details];
          sortedDetails.sort((a, b) => a.content.length - b.content.length);
          return sortedDetails;
        });
      },
    },
    methods: {
    calculateDurationCount() {
      let count = 0;
      for (const session of this.sessions) {
        if (session.details && Array.isArray(session.details)) {
          count += session.details.length;
        }
      }
      this.DurationCount = count;
    },
  
    calculateAverageDuration() {
      let totalDuration = 0;
      for (const session of this.sessions) {
        totalDuration += session.duration;
      }
      const averageDuration = totalDuration / this.sessions.length;
      this.AverageDuration = isNaN(averageDuration) ? 'N/A' : averageDuration.toFixed(2);
    },
  
    filterSessionsByDate() {
      if (!this.selectedDate) {
        return this.sessions;
      }
  
      const selectedDate = new Date(this.selectedDate);
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedDay = selectedDate.getDate();
  
      
      return this.sessions.filter((session) => {
        const sessionDate = new Date(session.date);
        const sessionYear = sessionDate.getFullYear();
        const sessionMonth = sessionDate.getMonth() + 1;
        const sessionDay = sessionDate.getDate();
  
        return (
          selectedYear === sessionYear &&
          selectedMonth === sessionMonth &&
          selectedDay === sessionDay
        );
      });
    },
  
    recalculateUserEngagement() {
    
      const filteredSessions = this.filterSessionsByDate();
  
      let count = 0;
      for (const session of filteredSessions) {
        if (session.details && Array.isArray(session.details)) {
          count += session.details.length;
        }
      }
      this.DurationCount = count;
  
      this.SessionCount = filteredSessions.length;
  
      let totalDuration = 0;
      for (const session of filteredSessions) {
        totalDuration += session.duration;
      }
      const averageDuration = totalDuration / filteredSessions.length;
      this.AverageDuration = isNaN(averageDuration) ? 'N/A' : averageDuration.toFixed(2);
    },
  
    },
    watch: {
      selectedDate: 'recalculateUserEngagement',
    }
  }
  </script>
  
  
  
  
  
  <style scoped> 
  .keyword-container{
     width: 100%;
   display: grid;  
   grid-template-columns: 1fr 1fr;
  }
  
  .keyword-item ul{
    display: flex;
    margin: .2rem 0 .2rem 0;
  }

  .keyword-columns {
    display: flex;
    gap: 3.5rem;
  }
  
  .keyword-item ul li{
    padding: 0 .2rem 0 .2rem;
  }
  
  hr{
    margin: .5rem 0 .5rem 0;
  }
  .analytics-box1{
    display: flex;
    justify-content: space-between;
    margin: 4rem 0 0 0;
    height: 15rem;
    width: calc(100vw - 27rem);
  }
  
  .user-engagement{
    background-color: white;
    width: 35%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  .user-engagement span, .keywords span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .keywords{
    background-color: white;
    width: 60%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .date-input{
    background-color: #F4F5F7;
    padding: .5rem;
  }
  
  .ue-row1{
    display: flex;
    width: 60%;
    font-size: 2rem;
    margin: 1rem 0 1rem 0;
  }
  
  .ue-row2{
    display: flex;
   
    margin: 1rem 0 1rem 0;
  }
  
  .ue-row3{
    display: flex;
   
    margin: 1rem 0 1rem 0;
  }
  </style>
  
   