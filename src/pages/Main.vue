<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchData } from '../api/api.js'
import Card from '../components/Card.vue';

export default {
  components: { Card },
  setup() {
    const characters = ref(null);
    const pagesCount = ref(1);
    const status = ref('');
    const name = ref('');
    const currentPage = ref(1); 

    const route = useRoute();
    const router = useRouter();
    
    const loadData = async () => {
      const { items, pages } = await fetchData({
        status: status.value,
        name: name.value,
        page: currentPage.value,
      });
      characters.value = items;
      pagesCount.value = pages;
    };

    const updateQueryParams = () => {
      router.push({
        query: {
          status: status.value || undefined,
          name: name.value || undefined,
          page: currentPage.value || undefined,
        },
      });
    };
    
    watch([status, name, currentPage], updateQueryParams);
    
    onMounted(() => {
      status.value = route.query.status || '';
      name.value = route.query.name || '';
      currentPage.value = route.query.page || 1;
      loadData();
    });
    
    const applyFilter = async () => {
      currentPage.value = 1;
      await loadData();
    };

    const paginate = async () => {
      await loadData();
    };

    return {
      characters,
      pagesCount,
      status,
      name,
      currentPage,
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
      <select v-model="status">
        <option value="" selected>All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <input v-model="name" type="text" placeholder="write name">
      <button @click="applyFilter">Apply</button>
    </div>
  </header>
  
  <main>
    <div class="pagination">
      <select v-model="currentPage" @change="paginate">
        <option v-for="page in pagesCount" :key="page" :value="page">Page #{{ page }}</option>
      </select>
    </div>
    <div class="main-content">
      <div v-if="characters" class="card-container">
        <div class="card-wrapper" v-for="character in characters" :key="character.id">
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

select, option, button, input{
  color: black;
}

.filter-container{
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 10px;
}

.pagination{
  background-color: lightblue;
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
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