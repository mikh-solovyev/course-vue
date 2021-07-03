<template lang="pug">
  .tag(:class="{'interactive': interactive}")
    span {{title}}
    button(
      v-on="$listeners"
      v-if="interactive"
      class="remove"
      type="button"
    )
</template>

<script>
import icon from "../icon";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    interactive: Boolean
  },
  components: {
    icon
  }
}
</script>

<style lang="postcss" scoped src="./tag.pcss"></style>
