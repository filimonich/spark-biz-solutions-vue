import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCkSh4C159tnB1o4JZMpvLteZjQW7ZXxdY",
  authDomain: "spark-biz-solutions-vue.firebaseapp.com",
  databaseURL:
    "https://spark-biz-solutions-vue-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spark-biz-solutions-vue",
  storageBucket: "spark-biz-solutions-vue.appspot.com",
  messagingSenderId: "1033901314331",
  appId: "1:1033901314331:web:7265aef9174f4d9427c3be",
  measurementId: "G-86S9RDNDT3",
};

// const app = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getDatabase(app);

let app;

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if (!app) {
    app = createApp(App).use(store).use(router).use(messagePlugin);
    app.mount("#app");
  }
});

// onAuthStateChanged(auth, user => {
//       createApp(App).use(store).use(router).use(messagePlugin).mount("#app");
// });
