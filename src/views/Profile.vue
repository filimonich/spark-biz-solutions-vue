<template>
  <div>
    <div class="page-title">
      <h3>{{ getLocalizedTitle("ProfileTitle") }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          :value="name"
          @input="name = $event.target.value"
          :class="{
            invalid: v$.name.$dirty && v$.name.required.$invalid,
          }"
        />
        <label for="description">{{ getLocalizedTitle("Name") }}</label>
        <small
          class="helper-text invalid"
          v-for="error of v$.name.$errors"
          :key="error.$uid"
          >{{ getLocalizedTitle("Message_EnterName") }}</small
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ getLocalizedTitle("Update") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import localeFilter from "@/filters/localize.filter";
export default {
  head() {
    return {
      title: this.$title("ProfileTitle"),
    };
  },
  data: () => ({
    name: "",
    isRuLocale: true,
  }),
  setup: () => {
    return { v$: useVuelidate() };
  },
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === "ru-RU";
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(["info"]),
    inputValue() {
      return this.name || this.info.name;
    },
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-US",
        });
      } catch (e) {
        console.error("Failed to update user information", e);
      }
    },
    getLocalizedTitle(key) {
      return this.$filters.localize(key);
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
