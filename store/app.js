export const state = () => ({
    currentApp: ''
})

export const mutations = {
    app(state, value) {
        state.currentApp = value
    }
}

export const getters = {
    currentApp({currentApp}) {
        return currentApp
    }
}