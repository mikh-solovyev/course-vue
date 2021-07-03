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
          :errorMessage="errorMessage"
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
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appInput from "../input";
import icon from "../icon";

export default {
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
    blocked: Boolean
  },
  data() {
    return {
      editmode: this.editModelByDefault,
      title: this.value,
      errorMessage: ""
    };
  },
  methods: {
    onApprove() {
      if(this.value.trim() === "") {
        this.errorMessage = "Введите название"
        return false;
      }

      if (this.title.trim() === "") return false;

      if (this.title.trim() === this.value.trim()) {
        this.editmode = false;
      } else {
        this.$emit("approve", this.value);
        this.errorMessage = "";
      }
    }
  },
  components: {
    icon,
    appInput
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>
