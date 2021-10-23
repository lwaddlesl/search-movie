<template>
  <div>
    <Header />
    <SearchForm />
    <FilterComp v-if="!$store.state.search" />
    <MovieList />
    <Pagination />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted() {
    if (this.$route.query.q) {
      this.$store.commit('getSearch', this.$route.query.q)
      this.searchMovies()
    }
    if (this.$route.query.page) {
      this.$store.commit('setPage', this.$route.query.page)
    }
  },
  methods: {
    ...mapActions(['searchMovies', 'getMovies']),
  },
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
