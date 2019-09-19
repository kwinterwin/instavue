import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { serverURL } from "../config";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userSession: window.sessionStorage.getItem("user") ? true : false,
        users: []
    },
    getters: {
        userSession(state) {
            return state.userSession;
        },
        users(state) {
            return state.users;
        }
    },
    mutations: {
        userSessionSetter(state, value) {
            state.userSession = value;
        },
        usersSetter(state, value) {
            state.users = value;
        },
        usersAdded(state, value) {
            state.users.push(value);
        }
    },
    actions: {
        usersSetter: async function (context) {
            let { data } = await axios.get(`${serverURL}/users`);
            context.commit('usersSetter', data);
        }
    },
});