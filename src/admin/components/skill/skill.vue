<template lang="pug">
  .skill-component(v-if="currentSkill.editmode === false")
    .skill
      .skill__title {{skill.title}}
      .skill__percent
        .skill__percent-number {{skill.percent}}
        .skill__percent-symbol %
      .skill__buttons
        icon(grayscale symbol="pencil" @click="currentSkill.editmode = true").skill__btn
        icon(grayscale symbol="trash" @click="$emit('remove', currentSkill)").skill__btn
  .skill-component(v-else)
    .skill
      .skill__title
        app-input(no-side-paddings v-model="currentSkill.title" :errorMessage="errorMessageTitle")
      .skill__percent
        app-input(type="number" min="0" max="100" maxlength="3" v-model="currentSkill.percent" :errorMessage="errorMessagePercent")
      .skill__buttons
        icon(symbol="tick" @click="[onApprove(currentSkill), $emit('approve', currentSkill)]").skill__btn
        icon(symbol="cross" @click="currentSkill.editmode = false").skill__btn
</template>

<script>
import input from "../input";
import icon from "../icon";

export default {
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editmode: false
      },
      errorMessageTitle: "",
      errorMessagePercent: ""
    }
  },
  components: {
    icon,
    appInput: input
  },
  methods: {
    onApprove(skill) {

    }
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>
