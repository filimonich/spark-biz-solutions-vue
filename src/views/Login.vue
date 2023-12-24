<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              (v$.email.$dirty && v$.email.required.$invalid) ||
              (v$.email.$dirty && v$.email.email.$invalid),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="error of v$.email.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              (v$.password.$dirty && v$.password.required.$invalid) ||
              (v$.password.$dirty && v$.password.minLength.$invalid),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="error of v$.password.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";

export default {
  setup: () => {
    return { v$: useVuelidate() };
  },
  data: () => ({
    email: "",
    password: "",
  }),
  validations: {
    email: {
      email: helpers.withMessage("Некорректная почта", email),
      required: helpers.withMessage(
        "Поле email не должно быть пустым",
        required
      ),
    },
    password: {
      required: helpers.withMessage(
        "Поле пароля не должно быть пустым",
        required
      ),
      minLength: helpers.withMessage(
        ({ $params, $model }) =>
          `Пароль должен быть ${$params.min} символов. Сейчас он ${$model.length}`,
        minLength(6)
      ),
    },
  },
  methods: {
    submitHandler() {
      console.log(this.v$);
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };

      console.log(formData);
      this.$router.push("/");
    },
  },
};
</script>
