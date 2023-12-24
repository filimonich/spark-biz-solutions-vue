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

export default {
  props: ["value"],
  setup() {
    const links = ref([
      { title: "Счет", url: "/" },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "/record" },
      { title: "Категории", url: "/categories" },
    ]);

    return {
      links,
    };
  },
};
</script>
