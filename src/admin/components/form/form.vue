<template lang="pug">
  component(
    :is="type"
    v-bind="$attrs"
    v-on="$listeners"
  )
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: "works"
    }
  },
  components: {
    works: () => import("./types/worksForm"),
    reviews: () => import("./types/reviewsForm"),
  }
}
</script>

<style scoped lang="postcss" src="./form.pcss"></style>