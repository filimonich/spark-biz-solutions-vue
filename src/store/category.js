import { getDatabase, ref, push, get, update } from "firebase/database";

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoriesRef = ref(db, `users/${uid}/categories`);
        const categoriesSnapshot = await get(categoriesRef);
        const categories = categoriesSnapshot.val() || {};
        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const database = getDatabase();
        const categoryRef = ref(database, `users/${uid}/categories/${id}`);
        const snapshot = await get(categoryRef);
        const category = snapshot.val() || {};
        return { ...category, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `users/${uid}/categories/${id}`);
        await update(categoryRef, { title, limit });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
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
