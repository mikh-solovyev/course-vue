<template lang="pug">
  .form-component
    form.form(@submit.prevent="handleSubmit")
      card(:title="formTitle").form-title
        .form-container(slot="content")
          .form-cols
            .form-col
              label(
                :style="{backgroundImage: `url(${currentItem.preview})`}"
                :class="[ 'uploader', {active: currentItem.preview}, { hovered: hovered }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              )
                .uploader-title Перетащите или загрузите картинку для загрузки изображения
                .uploader-btn
                  app-button(typeAttr="file" @change="handleChange")
            .form-col
              .form-row
                app-input(
                  v-model="currentItem.title"
                  title="Название"
                  placeholder="Введите название"
                  :errorMessage="validation.firstError('currentItem.title')"
                )
              .form-row
                app-input(
                  v-model="currentItem.link"
                  title="Ссылка"
                  placeholder="Ссылка на проект"
                )
              .form-row
                app-input(
                  v-model="currentItem.description"
                  title="Описание"
                  placeholder="Введите описание"
                  field-type="textarea"
                  :errorMessage="validation.firstError('currentItem.description')"
                )
              .form-row
                tags-adder(
                  v-model="currentItem.techs"
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
    "currentItem.title": value => {
      return Validator.value(value).required("Введите название");
    },
    "currentItem.description": value => {
      return Validator.value(value).required("Введите описание");
    },
  },
  props: ["editedWork", "formTitle"],
  data() {
    return {
      hovered: false,
      item: {
        id: "",
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      }
    };
  },
  computed: {
    currentItem: {
      get() {
        if(this.editedWork && this.editedWork.id) {
          this.item = this.editedWork;
        }

        return this.item;
      }
    }
  },
  methods: {
    async handleSubmit() {
      if(await this.$validate() === false) return;
      this.$emit("changeWorks", this.item);
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
      this.item.title = "";
      this.item.link = "";
      this.item.description = "";
      this.item.techs = "";
      this.item.photo = {};
      this.item.preview = "";

      this.$emit("hideEditor");
    },
  }
}
</script>

<style scoped lang="postcss" src="./worksForm.pcss"></style>