export const state = () => ({
    demand: {},
    category: {},
    demandwinuser: {},
})

export const mutations = {
    setCurrentDemand(state, demand) {
        state.demand = demand;
    },

    setCategory(state, category) {
        state.category = category;
    },

    setDemandwinuser(state, demand) {
        state.demandwinuser = demand;
    }


}
