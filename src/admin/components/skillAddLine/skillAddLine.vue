<template lang="pug">
  div(:class="['skill-add-line-component', {blocked: blocked}]")
    .title
      app-input(
        placeholder="Новый навык",
        v-model="skill.title",
        :errorMessage="validation.firstError('skill.title')"
      )
    .percent
      app-input(
        type="number"
        min="0"
        max="100"
        maxlength="3",
        v-model="skill.percent",
        :errorMessage="validation.firstError('skill.percent')"
      )
    .button
      round-button(
        type="round"
        @click="handleClick"
      )
</template>

<script>
import input from "../input";
import button from "../button";
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    "skill.title": value => {
      return Validator.value(value).required("Введите название");
    },
    "skill.percent": value => {
      return Validator.value(value)
          .integer("Должно быть числом")
          .between(0, 100, "Некорректное значение")
          .required("Введите значение");
    }
  },
  props: {
    blocked: Boolean,
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  data() {
    return {
      skill: {
        title: "",
        percent: ""
      },
      errorMessageTitle: "",
      errorMessagePercent: ""
    }
  },
  methods: {
    async handleClick() {
      if(await this.$validate() === false) return;
      this.$emit("approve", this.skill);
    }
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>
