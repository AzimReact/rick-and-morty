<template>
  <div class="card">
    <img :src="image" :alt="name" class="card-image">
    <div class="card-content">
      <h2 class="card-title">{{ name }}</h2>
      <p>Status: {{ status }}</p>
      <p>Location: {{ location }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>

.card {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.card-image {
  width: 40%;
  height: auto;
}

.card-content {
  width: 60%;
  background-color: rgb(73, 73, 73);
  padding: 16px;
}

.card-title {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 1.2rem;
  font-weight: bold;
}

</style>
