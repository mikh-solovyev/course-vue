<template lang="pug">
  div(:class="['skill-add-line-component', {blocked: blocked}]")
    .title
      app-input(
        placeholder="Новый навык",
        v-model="value.title",
        :errorMessage="errorMessageTitle"
      )
    .percent
      app-input(
        type="number"
        min="0"
        max="100"
        maxlength="3",
        v-model="value.percent",
        :errorMessage="errorMessagePercent"
      )
    .button
      round-button(
        type="round"
        @click="onAdd"
      )
</template>

<script>
import input from "../input";
import button from "../button";
export default {
  props: {
    blocked: Boolean,
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  data() {
    return {
      value: {
        title: "",
        percent: ""
      },
      errorMessageTitle: "",
      errorMessagePercent: ""
    }
  },
  methods: {
    onAdd() {
      if(this.value.title.trim() === "") {
        this.errorMessageTitle = "Введите название";
      } else {
        this.errorMessageTitle = "";
      }

      if(this.value.percent.trim() === "") {
        this.errorMessagePercent = "Введите %";
      } else {
        this.errorMessagePercent = "";
      }

    }
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>
