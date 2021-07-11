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
        app-input(
          no-side-paddings
          v-model="currentSkill.title"
          :errorMessage="validation.firstError('currentSkill.title')"
        )
      .skill__percent
        app-input(
          type="number"
          min="0"
          max="100"
          maxlength="3"
          v-model="currentSkill.percent"
          :errorMessage="validation.firstError('currentSkill.percent')"
        )
      .skill__buttons
        icon(symbol="tick" @click="onApprove(currentSkill)").skill__btn
        icon(symbol="cross" @click="currentSkill.editmode = false").skill__btn
</template>

<script>
import input from "../input";
import icon from "../icon";
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentSkill.title": value => {
      return Validator.value(value).required("Введите название");
    },
    "currentSkill.percent": value => {
      return Validator.value(value)
          .integer("Должно быть числом")
          .between(0, 100, "Некорректное значение")
          .required("Введите значение");
    }
  },
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
    async onApprove(skill) {
      if(await this.$validate() === false) return;

      this.$emit('approve', skill);
    }
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>
