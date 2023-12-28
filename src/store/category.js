import { getDatabase, push, ref } from "firebase/database";

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const database = getDatabase();
        const categoryRef = ref(database, `users/${uid}/categories`);
        const category = await push(categoryRef, { title, limit });
        return { title, limit, id: category.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
