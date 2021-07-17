<template lang="pug">
  .login-page-component
    .content
      form(class="form" @submit.prevent="handleSubmit")
        .form-title Авторизация
        .row
          app-input(
            v-model="user.name"
            title="Логин"
            icon="user"
            :errorMessage="validation.firstError('user.name')"
          )
        .row
          app-input(
            v-model="user.password"
            title="Пароль"
            icon="key"
            type="password"
            :errorMessage="validation.firstError('user.password')"
          )
        .btn
          app-button(
            title="Отправить"
            :disabled="isSubmitDisabled"
            typeAttr="submit"
          )
</template>


<script>
import appInput from '../../components/input';
import appButton from '../../components/button';
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';
import $axios from '../../requests';
import { mapActions } from 'vuex';

export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": value => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": value => {
      return Validator.value(value).required("Введите пароль");
    },
  },
  data: () => ({
    user: {
      name: "",
      password: ""
    },
    isSubmitDisabled: false
  }),
  components: {
    appInput, appButton
  },
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      login : "user/login"
    }),
    async handleSubmit() {
      if(await this.$validate() === false) return;

      this.isSubmitDisabled = true;

      try {
        const response = await $axios.post("/login", this.user);

        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        const userResponse = await $axios.get("/user");
        this.login(userResponse.data.user);
        await this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          text: error.response.data.error,
          type: "error"
        });
      } finally {
        this.isSubmitDisabled = false;
      }

    }
  }
}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>

