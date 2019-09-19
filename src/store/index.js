import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userSession: false
    },
    getters: {
        userSession(state) {
            return state.userSession;
        },
    },
    mutations: {
        userSessionSetter(state, value) {
            state.userSession = value;
        }
    },
    actions: {
    },
});