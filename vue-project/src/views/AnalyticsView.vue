 <script>
</script>
<template>
  <div class="container">
    <div class="items">
      <section class="box">
        <span>
          <label for="datepicker"><b>Select Date </b></label>
          <input class="date-input" type="date" id="datepicker" name="selectedDate">
        </span>
      </section>

      <section class="analytics-box1">
        
      <form class="user-engagement">
        <dl>
          <span class="ue-row1">
              <dt><b>Sessions: </b></dt>
              <dd><b>21</b></dd>    
          </span>
    
          <span class="ue-row2">
            <dt>No. user inquiries:</dt>
            <dd>15</dd>
          </span>
          
          <span class="ue-row2">
            <dt>Average Session Duration:</dt>
            <dd>3</dd>
          </span>
      
        </dl>
      </form>
      <form class="keywords">
        <h2 class="box-heading"><b>Top Keywords</b></h2>
        <div class="keyword-container">
          <span class="keyword-item">
            <ul>
              <li>1. </li>
              <li>Admission</li>
              <li> 60</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>2. </li>
              <li>Enrollment</li>
              <li> 57</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>3. </li>
              <li>Programs</li>
              <li> 55</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>4. </li>
              <li>Email</li>
              <li> 48</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>5. </li>
              <li> Courses</li>
              <li> 44</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>6. </li>
              <li>Scholarships</li>
              <li> 40</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>7. </li>
              <li>Transfer</li>
              <li> 39</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>8. </li>
              <li>Shift</li>
              <li> 37</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>9. </li>
              <li>Community Service</li>
              <li> 35</li>
             </ul>
          </span>
          <span class="keyword-item">
            <ul>
              <li>10. </li>
              <li>History</li>
              <li>20</li>
             </ul>
          </span>
     
        </div>
      </form>
    </section>

    <section class="analytics-box2">
      <div class="box">
        <h2 class="box-heading"><b>Records</b></h2>
        <table>
          <thead>
            <tr>
                <th width="10%">ID.</th>
                <th width="20%">Session no.</th>
                <th width="20%">Duration.</th>
                <th width="30%">Details</th>
                <th width="20%" > </th>
             </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>233</td>
              <td>5</td>
              <td>Can i ask about admissions?</td>
              <td class="details-btn-td"><button class="details-tbn">view</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>234</td>
              <td>5</td>
              <td>What is your name?</td>
              <td class="details-btn-td"><button class="details-tbn">view</button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>235</td>
              <td>7</td>
              <td>What are the available programs?</td>
              <td class="details-btn-td"><button class="details-tbn">view</button></td>
            </tr>
            <tr>
              <td>4</td>
              <td>236</td>
              <td>8</td>
              <td>Who is the president of the university?</td>
              <td class="details-btn-td"><button class="details-tbn">view</button></td>
            </tr>
            <tr>
              <td>5</td>
              <td>237</td>
              <td>7</td>
              <td>How much is tuition for IT?</td>
              <td class="details-btn-td"><button class="details-tbn">view</button></td>
            </tr>
            <tr>
              <td>6</td>
              <td>238</td>
              <td>9</td>
              <td>How can i pay tuition?</td>
              <td class="details-btn-td"><button class="details-tbn">view</button></td>
            </tr>
            <tr>
              <td>7</td>
              <td>239</td>
              <td>4</td>
              <td>Can you make my homework?</td>
              <td class="details-btn-td"><button class="details-tbn">view</button></td>
            </tr>
            <tr>
              <td>8</td>
              <td>240</td>
              <td>5</td>
              <td>do you offer architecture?</td>
              <td class="details-btn-td"><button class="details-tbn">view</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    </div>
   
  </div>
</template>

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

 