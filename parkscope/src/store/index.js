import { createStore, createLogger } from 'vuex'

const plugins = [createLogger()]

export default createStore({
    state: {
        parksFreePlaces: null
    },
    getters: {

    },
    actions: {

    },
    plugins
})