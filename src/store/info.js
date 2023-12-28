import { getDatabase, ref, update, onValue } from "firebase/database";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updateData = { ...getters.info, ...toUpdate };
        const db = getDatabase();
        const infoRef = ref(db, `users/${uid}/info`);
        await update(infoRef, updateData);
        commit("setInfo", updateData);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const infoRef = ref(db, `/users/${uid}/info`);

        onValue(infoRef, snapshot => {
          const info = snapshot.val();
          commit("setInfo", info);
        });
      } catch (e) {
        console.error(e);
        commit("setError", e);
        throw e;
      }
    },
  },
  getters: {
    info: state => state.info,
  },
};
