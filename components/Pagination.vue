<template>
  <div v-if="!$store.state.isMoviesLoading" class="pagination">
    <div class="pagination__item">
      <button v-if="$store.state.curPage > 1" @click="prev">prev</button>
    </div>
    <div v-if="$store.state.maxPages > 1" class="pagination__item">
      {{ $store.state.curPage }}/{{ $store.state.maxPages }}
    </div>
    <div class="pagination__item">
      <button
        v-if="$store.state.curPage < $store.state.maxPages"
        class="next-btn"
        @click="next"
      >
        next
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapActions(['getMovies']),
    ...mapMutations({ n: 'next', p: 'prev' }),
    next() {
      this.n()
      this.$router.push({
        path: this.$route.fullPath,
        query: { page: this.$store.state.curPage },
      })
      this.getMovies()
    },
    prev() {
      this.p()
      this.$router.push({
        path: this.$route.fullPath,
        query: { page: this.$store.state.curPage },
      })
      this.getMovies()
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  .pagination__item {
    margin-right: 20px;
  }
  button {
    color: black;
    padding: 5px 15px 5px 15px;
    cursor: pointer;
    &:hover {
      box-shadow: 1px 1px 19px 1px black;
    }
  }
}
</style>