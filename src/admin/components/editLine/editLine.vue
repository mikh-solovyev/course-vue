<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorText="errorText"
          :errorMessage="validation.firstError('title')"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove', categoryId)"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appInput from "../input";
import icon from "../icon";
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    "value": value => {
      return Validator.value(value).required("Введите название");
    },
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    editModelByDefault: Boolean,
    blocked: Boolean,
    categoryId: Number
  },
  data() {
    return {
      editmode: this.editModelByDefault,
      title: this.value,
      errorMessage: ""
    };
  },
  methods: {
    async onApprove() {

      if(await this.$validate() === false) return;

      if (this.title.trim() !== this.value.trim()) {
        this.$emit("approve", this.value);
      }

      this.editmode = false;
    }
  },
  components: {
    icon,
    appInput
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>
