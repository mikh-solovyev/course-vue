<template lang="pug">
  .headline-component
    .container
      .headline
        slot
        .headline__title {{title}}
        .headline__buttons
          button(type="button").btn.headline__btn Выйти
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Панель администрирования"
    }
  }
}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>
