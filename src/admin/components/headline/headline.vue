<template lang="pug">
  .headline-component
    .container
      .headline
        slot
        .headline__title {{title}}
        .headline__buttons
          button(type="button" @click="logout").btn.headline__btn Выйти
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    title: {
      type: String,
      default: "Панель администрирования"
    }
  },
  methods: {
    ...mapActions({
      logout : "user/logout"
    })
  }
}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>
