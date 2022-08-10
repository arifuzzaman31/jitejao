export const state = () => ({
    nilam: {},
    nilamBidList: [],
    category: {},
})

export const mutations = {
    setCurrentNilam(state, nilam) {
        state.nilam = nilam;
    },

    setCategory(state, category) {
        state.category = category;
    },

    addNewBid(state, bid) {
        state.nilamBidList.data.unshift(bid)
    },

    setBid(state, bids) {
        if (bids.meta) {
            if (bids.meta.current_page != 1) {
                if (bids.data.length > 0) {
                    bids.data.forEach(bid => {
                        state.nilamBidList.data.push(bid);
                    });
                }
            }
            else {
                state.nilamBidList = bids;
            }

        }
    },

    NilamWinner(state) {
        state.nilam.is_expired = true;
    }

}
