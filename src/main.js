import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

let app;

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if (!app) {
    app = createApp(App).use(store).use(router).use(messagePlugin);
    app.directive("tooltip", tooltipDirective);
    app.component("Loader", Loader);
    app.config.globalProperties.$filters = {
      currency: currencyFilter,
    };
    app.mount("#app");
  }
});
