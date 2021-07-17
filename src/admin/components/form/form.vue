<template lang="pug">
  .form-component
    form.form(@submit.prevent="handleSubmit")
      card(:title="formTitle").form-title
        .form-container(slot="content")
          .form-cols
            .form-col
              label(
                :style="{backgroundImage: `url(${currentWork.preview})`}"
                :class="[ 'uploader', {active: currentWork.preview}, { hovered: hovered }]"
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
                  v-model="currentWork.title"
                  title="Название"
                  :errorMessage="validation.firstError('currentWork.title')"
                )
              .form-row
                app-input(
                  v-model="currentWork.link"
                  title="Ссылка"
                )
              .form-row
                app-input(
                  v-model="currentWork.description"
                  title="Описание"
                  field-type="textarea"
                  :errorMessage="validation.firstError('currentWork.description')"
                )
              .form-row
                tags-adder(
                  v-model="currentWork.techs"
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
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';

export default {
  components: { card, appButton, appInput, tagsAdder },
  mixins: [ValidatorMixin],
  validators: {
    "currentWork.title": value => {
      return Validator.value(value).required("Введите название");
    },
    "currentWork.description": value => {
      return Validator.value(value).required("Введите описание");
    },
  },
  props: ["editedWork", "formTitle"],
  data() {
    return {
      hovered: false,
      work: {
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
    currentWork: {
      get() {
        if(this.editedWork.id) {
          this.work = this.editedWork;
        }

        return this.work;
      },
      set(value) {
        console.log(value);
        return value;
      }

    }
  },
  methods: {
    async handleSubmit() {
      if(await this.$validate() === false) return;
      this.$emit("changeWorks", this.work);
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
      this.work.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.work.preview = reader.result;
      };
    },
    handlerCancel() {
      this.work.id = "";
      this.work.title = "";
      this.work.link = "";
      this.work.description = "";
      this.work.techs = "";
      this.work.photo = {};
      this.work.preview = "";

      this.$emit("hideEditor");
    }
  }
}
</script>

<style scoped lang="postcss" src="./form.pcss"></style>