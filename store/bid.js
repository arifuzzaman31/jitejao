export const state = () => ({
    bidList: [],
    shortListedBid: [],
    confirmBid: null,
    bidDetails: null,
    bidRatingFrom: 'public',
    current_tab: 1,
    bidUserContact: {},
    bidSellerReview: null,
    bid_counter: 0,
    shbid_counter: 0,
    winner_counter: 0,
    allNotifications: [],
    notifytotalpage : []
})

export const mutations = {
    setConfirmBid(state, bid) {
        state.confirmBid = bid;
    },

    setBidDetails(state, bid) {
        state.bidDetails = bid;
    },

    setSellerReviewBid(state, bid) {
        state.bidSellerReview = bid;
    },

    setBidRatingStatus(state, status) {
        state.bidRatingFrom = status;
    },
    setBid(state, bids) {
        if (bids.meta) {
            if (bids.meta.current_page != 1) {
                if (bids.data.length > 0) {
                    bids.data.forEach(bid => {
                        state.bidList.data.push(bid);
                    });
                }
            }
            else {
                state.bidList = bids;
            }

        }
    },

    addNewBid(state, bid) {
        state.bidList.data.unshift(bid)
    },
    setShortlistedBid(state, bids) {
        if (bids.meta) {
            if (bids.meta.current_page != 1) {
                if (bids.data.length > 0) {
                    bids.data.forEach(bid => {
                        state.shortListedBid.data.push(bid);
                    });
                }
            }
            else {
                state.shortListedBid = bids;
            }

        }
    },

    addNewShortlistedBid(state, bid) {
        state.shortListedBid.data.unshift(bid)
    },

    changeBidStatus(state, bid_id) {
        let index = state.bidList.data.findIndex(bid => bid.id === bid_id);
        state.bidList.data[index].is_shortlisted = !state.bidList.data[index].is_shortlisted;
        // state.bidList.data.splice(index, 1);
    },

    changeShortlistedBidStatus(state, bid_id) {
        let index = state.shortListedBid.data.findIndex(bid => bid.id === bid_id);
        state.shortListedBid.data.splice(index, 1);

    },

    setUserContact(state, bidUser) {
        state.bidUserContact = bidUser;
    },

    setCurrentTab(state, tab) {
        state.current_tab = tab;
    },

    setBidCounter(state,bid){
        if(bid == 'icr'){
            state.bid_counter += 1;
        } else if(bid == 'dcr') {
            state.bid_counter -= 1;
        } else {
            state.bid_counter = bid;
        }
    },
    setShortlistBidCounter(state,bid){
        if(bid == 'icr'){
            state.shbid_counter += 1;
        } else if(bid == 'dcr') {
            state.shbid_counter -= 1;
        } else {
            state.shbid_counter = bid;
        }
    },
    setWinnerCounter(state,bid){
        state.winner_counter = bid;
    },

    setAllNotification(state, notification) {
        if (notification.meta) {
            if (notification.meta.current_page != 1) {
                if (notification.data.length > 0) {
                    notification.data.forEach(notifica => {
                        state.allNotifications.push(notifica);
                    });
                }
            }
            else {
                state.allNotifications = notification.data;
            }
            state.notifytotalpage = notification.meta;

        }
    },

    setRemoveNotification(state,notifica_id){
        let index = state.allNotifications.findIndex(notifica => notifica.id === notifica_id);
        state.allNotifications.splice(index, 1);
    }

}
