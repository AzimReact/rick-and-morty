<script>
import { ref, onMounted } from 'vue';
import { fetchData } from './api/api.js'
import Card from './components/Card.vue';

export default {
  components: { Card },
  setup() {
    const responseData = ref(null);
    const selectedStatus = ref('');

    onMounted(() => {
      fetchData(responseData);
    });
    
    const applyFilter = async () => {
      await fetchData(responseData, selectedStatus);
    };
    
    const paginate = async (page) => {
      await fetchData(responseData, selectedStatus, page);
    };

    return {
      responseData,
      selectedStatus,
      applyFilter,
      paginate
    };
  },
}; 
</script>

<template>
  <header>
    <h1 class="title">The Rick and Morty</h1>
    <div class="filter-container">
      <select v-model="selectedStatus">
        <option value="" selected>All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button @click="applyFilter">Apply</button>
    </div>
  </header>
  
  <main>
    <div class="pagination">
      <button class="pag-btn" @click="paginate(page)" v-for="page in responseData?.info?.pages" :key="page">
        {{ page }}
      </button>
    </div>
    <div class="main-content">
      <div v-if="responseData" class="card-container">
  
        <div class="card-wrapper" v-for="character in responseData.results" :key="character.id">
          <card :name="character.name" :image="character.image" :status="character.status" :location="character.location.name" />
        </div>
      </div>
      <div v-else>
  
        <p>Loading...</p>
      </div>
    </div>
  </main>

</template>


<style scoped>

* {
  color: white;
}

select, option, button{
  color: black;
}

.filter-container{
  display: flex;
  justify-content: center;
  padding: 20px;
}

.pagination{
  background-color: lightblue;
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.pag-btn{
  width: 25px;
  height: 25px;
}

.pag-btn:hover{
  transition: 0.3s;
  background-color: lightslategrey;
  cursor: pointer;
}

.main-content{
  background-color: rgb(44, 44, 54);
  padding: 50px 0;
}

.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.card-wrapper{
  width: 40%;
}

.title{
  color: black;
  padding: 25px 0;
  text-align: center;
}

@media screen and (max-width: 1024px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }
  .card-wrapper{
    width: 70%;
  }
}

@media screen and (max-width: 550px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }
  .card-wrapper{
    width: 90%;
  }
}
</style>