<template>
  <div v-if="!search" class="movie-list">
    <Movie v-for="(movie, index) in movies" :key="index" :movie="movie" />
  </div>
  <div v-else-if="search" class="movie-list">
    <Movie
      v-for="(movie, index) in searchedMovies"
      :key="index"
      :movie="movie"
    />
  </div>
</template>

<script>
export default {
  props: {
    movies: Array,
    searchedMovies: Array,
    search: String,
  },
}
</script>

<style lang="scss" scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>