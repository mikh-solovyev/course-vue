<template lang="pug">
  .form-component
    form.form(@submit.prevent="handleSubmit")
      card(:title="formTitle").form-title
        .form-container(slot="content")
          .form-cols
            .form-col.form-col-left
              label(
                :style="{backgroundImage: `url(${currentItem.preview})`}"
                :class="[ 'uploader', {active: currentItem.preview}, { hovered: hovered }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              )
                .uploader-title
                .uploader-btn
                  app-button(typeAttr="file" title="Добавить фото" @change="handleChange" notGround)
            .form-col.form-col-right
              .form-row.form-row--top
                app-input(
                  v-model="currentItem.author"
                  title="Имя автора"
                  placeholder="Введите имя"
                  :errorMessage="validation.firstError('currentItem.author')"
                )
                app-input(
                  v-model="currentItem.occ"
                  title="Должность автора"
                  placeholder="Введите должность"
                  :errorMessage="validation.firstError('currentItem.occ')"
                )
              .form-row
                app-input(
                  v-model="currentItem.text"
                  title="Отзыв"
                  field-type="textarea"
                  placeholder="Введите текст"
                  :errorMessage="validation.firstError('currentItem.text')"
                )
          .form-btns
            .btn
              app-button(
                @click="handlerCancel"
                title="Отмена"
                plain
              )
            .btn
              app-button(title="Сохранить" typeAttr="submit")
</template>

<script>
import card from "../../../card";
import appButton from "../../../button";
import appInput from "../../../input";
import tagsAdder from "../../../tagsAdder";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';

export default {
  components: { card, appButton, appInput, tagsAdder },
  mixins: [ValidatorMixin],
  validators: {
    "currentItem.author": value => {
      return Validator.value(value).required("Введите название");
    },
    "currentItem.occ": value => {
      return Validator.value(value).required("Введите должность");
    },
    "currentItem.text": value => {
      return Validator.value(value).required("Введите отзыв");
    },
  },
  props: ["editedReview", "formTitle"],
  data() {
    return {
      hovered: false,
      item: {
        id: "",
        author: "",
        occ: "",
        text: "",
        photo: {},
        preview: "",
      }
    };
  },
  computed: {
    currentItem: {
      get() {
        if(this.editedReview && this.editedReview.id) {
          this.item = this.editedReview;
        }

        return this.item;
      }
    }
  },
  methods: {
    async handleSubmit() {
      if(await this.$validate() === false) return;
      this.$emit("changeReviews", this.item);
    },
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
          ? event.dataTransfer.files[0]
          : event.target.files[0];
      this.item.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.item.preview = reader.result;
      };
    },
    handlerCancel() {
      this.item.id = "";
      this.item.author = "";
      this.item.occ = "";
      this.item.text = "";
      this.item.photo = {};
      this.item.preview = "";

      this.$emit("hideEditor");
    },
  }
}
</script>

<style scoped lang="postcss" src="./reviewsForm.pcss"></style>