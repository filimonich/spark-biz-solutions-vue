import { getDatabase, ref, onValue } from "firebase/database";

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
      }
    },
  },
  getters: {
    info: state => state.info,
  },
};
