import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import category from './category'

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: s => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${key}&symbols=USD,EUR,RUB`
      );
      return await res.json();
    },
  },
  modules: {
    auth,
    info,
    category,
  },
});
