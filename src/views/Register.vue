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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            incalid: v$.name.$dirty && v$.name.required.$invalid,
          }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-for="error of v$.name.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
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
    name: "",
    email: "",
    password: "",
    agree: false,
  }),
  validations: {
    name: {
      required: helpers.withMessage(
        "Поле имени не должно быть пустым",
        required
      ),
      minLength: helpers.withMessage(
        ({ $params, $model }) =>
          `Имя должно содержать как минимум ${$params.min} символов. Сейчас ${$model.length}`,
        minLength(3)
      ),
    },
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
    agree: {
      checked: value => !!value,
    },
  },
  methods: {
    async submitHandler() {
      console.log(this.v$);
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      try {
        console.log(formData)
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>
