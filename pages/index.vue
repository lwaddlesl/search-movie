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
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
