<template>
  <div v-if="!search && !$store.state.isMoviesLoading" class="movie-list">
    <Movie v-for="(movie, index) in movies" :key="index" :movie="movie" />
  </div>
  <div v-else-if="search && !$store.state.isMoviesLoading" class="movie-list">
    <Movie
      v-for="(movie, index) in searchedMovies"
      :key="index"
      :movie="movie"
    />
  </div>
  <div v-else-if="$store.state.isMoviesLoading" class="movie-list">
    <h1>is Loading</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  async fetch() {
    await this.getMovies()
  },
  computed: {
    ...mapState(['movies', 'search', 'searchedMovies']),
  },
  methods: {
    ...mapActions(['getMovies']),
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