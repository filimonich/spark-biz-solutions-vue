import { getDatabase, ref, push, get } from "firebase/database";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        const database = getDatabase();
        return await push(ref(database, `users/${uid}/records`), record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const database = getDatabase();
        const recordsRef = ref(database, `users/${uid}/records`);
        const snapshot = await get(recordsRef);
        const records = snapshot.val() || {};
        const transformedRecords = Object.keys(records).map(key => ({
          ...records[key],
          id: key,
        }));
        return transformedRecords;
      } catch (e) {
        console.error("Error:", e);
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid");
        const database = getDatabase();
        const recordRef = ref(database, `users/${uid}/records/${id}`);
        const snapshot = await get(recordRef);
        const record = snapshot.val() || {};
        return { ...record, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
