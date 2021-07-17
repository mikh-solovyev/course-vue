<template lang="pug">
  .works-page-component.page-component
    .page-content
      .container
        .header
          .header__title Блок "Работы"
        div.form(v-if="isEditorShow")
          app-form(
            @hideEditor="hideEditor"
            @changeWorks="changeWorks($event)"
            :editedWork="editedWork"
            :formTitle="formTitle"
          )
        ul.cards
          li.item(v-if="!isEditorShow")
            app-button(
              type="square"
              title="Добавить работу"
              @click="isEditorShow = true"
            )
          li.item(v-for="work in works" :key="work.id")
            work-card(
              @editWork="editWork($event)"
              @removeWork="removeWork($event)"
              :work="work"
            )
</template>

<script>
import appForm from "../../components/form";
import workCard from "../../components/workCard";
import appButton from "../../components/button";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isEditorShow: false,
      formTitle: "Добавление работы",
      editedWork: {},
    }
  },
  components: {appForm, workCard, appButton},
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchWorksAction: "works/fetch",
      addWorkAction: "works/add",
      editWorkAction: "works/edit",
      removeWorkAction: "works/remove",
      showTooltip: "tooltips/show"
    }),
    async changeWorks(work) {

      if(work.id.length === 0) {
        try {
          await this.addWorkAction(work);

          this.showTooltip({
            text: `Добавление работы - ${work.title}`,
            type: "success"
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error"
          });
        }
      } else {
        try {
          await this.editWorkAction(work);

          this.showTooltip({
            text: `Редактирование работы - ${work.title}`,
            type: "success"
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error"
          });
        }
      }

      this.isEditorShow = false;

    },
    editWork(work) {
      this.formTitle = "Редактирование работы"
      this.isEditorShow = true;
      work.preview = `https://webdev-api.loftschool.com/${work.photo}`
      this.editedWork = {...work};
    },
    hideEditor() {
      this.formTitle = "Добавление работы";
      this.isEditorShow = false;
    },
    async removeWork(workId) {

      try {
        await this.removeWorkAction(workId);
        this.showTooltip({
          text: `Удаление работы id - ${workId}`,
          type: "success"
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }
    }
  },
  mounted() {
    this.fetchWorksAction();
  }
}
</script>

<style scoped lang="postcss" src="./works.pcss"></style>
