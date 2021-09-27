<template>
  <div class="search-form">
    <input
      class="search"
      placeholder="Search"
      type="text"
      :value="search"
      @keyup.enter="getSearch"
    />
    <button v-show="search !== ''" class="btn" @click="clear">Clear</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      search: (state) => state.search,
    }),
  },
  methods: {
    ...mapActions(['searchMovies', 'getMovies']),
    ...mapMutations({ c: 'clear' }),
    clear() {
      this.c()
      this.getMovies()
    },
    getSearch(e) {
      this.$store.commit('getSearch', e.target.value)
      this.searchMovies()
    },
  },
}
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  justify-content: center;
  color: black;
  input {
    color: #000;
  }
  .search {
    width: 500px;
    height: 20px;
    padding: 15px;
  }
  .btn {
    margin-left: 20px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: rgb(134, 89, 89);
  }
}
</style>