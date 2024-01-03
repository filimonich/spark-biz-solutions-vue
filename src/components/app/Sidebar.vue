<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <li
      v-for="link in links"
      :key="link.url"
      :class="{ active: link.url === $route.path }"
    >
      <router-link :to="link.url" class="waves-effect waves-orange pointer">
        {{ link.title }}
      </router-link>
    </li>
  </ul>
  {{ value }}
</template>

<script>
import { ref } from "vue";
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ["value"],
  setup() {
    const links = ref([
      { title: localizeFilter("Menu_Bill"), url: "/", exact: true },
      { title: localizeFilter("Menu_History"), url: "/history" },
      { title: localizeFilter("Menu_Planning"), url: "/planning" },
      { title: localizeFilter("Menu_NewRecord"), url: "/record" },
      { title: localizeFilter("Menu_Categories"), url: "/categories" },
    ]);

    return {
      links,
    };
  },
};
</script>
