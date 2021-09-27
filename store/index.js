import axios from 'axios'

export const state = {
    URL: 'https://api.themoviedb.org/3',
    APIKEY: 'f1dfea0ae51d06d0af3e583914087e6c',
    curPage: 1,
    movies: [],
    search: '',
    searchedMovies: [],
    maxPages: 0,
    selectFilter: 'popular',
}
export const getters = {
}
export const actions = {
    async getMovies({ state, commit }) {
        commit('setPage', state.curPage)
        commit('setSelectFilter', state.selectFilter)
        commit('moviesClear')

        if (!state.search) {
            const response = await axios.get(
                `${state.URL}/movie/${state.selectFilter}?api_key=${state.APIKEY}&language=en-US&page=${state.curPage}`
            )
            commit('setMovies', response.data.results)
        } else {
            const response = await axios.get(
                `${state.URL}/search/movie/?api_key=${state.APIKEY}&language=en-US&page=${state.curPage}&query=${state.search}`
            )
            commit('setSearchedMovies', response.data.results)
        }
    },
    async searchMovies({ state, commit }) {
        commit('getSearch', state.search)
        commit('searchClear')

        const response = await axios.get(
            `${state.URL}/search/movie/?api_key=${state.APIKEY}&language=en-US&page=${state.curPage}&query=${state.search}`
        )
        commit('setSearchedMovies', response.data.results)

    },

}
export const mutations = {
    moviesClear(state) {
        state.movies = []
        state.searchedMovies = []
    },
    setMovies(state, movies) {
        state.movies = movies;
    },
    setSearchedMovies(state, movies) {
        state.searchedMovies = movies;
    },
    setPage(state, curPage) {
        state.curPage = curPage
    },
    setSelectFilter(state, selectFilter) {
        state.selectFilter = selectFilter
    },
    next(state) {
        state.curPage++
    },
    prev(state) {
        state.curPage--
    },
    getSearch(state, search) {
        state.search = search
    },
    updateFilter(state, selectFilter) {
        state.selectFilter = selectFilter
    },

    filter(state) {
        state.movies = []
        state.curPage = 1
    },
    searchClear(state) {
        state.searchedMovies = []
        state.curPage = 1
    },
    clear(state) {
        state.search = ''
        state.searchedMovies = []
        state.curPage = 1
    },
}