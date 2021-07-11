<template lang="pug">
  .abaut-page-component
    .page-content
      .container(v-if="categories.length")
        .header
          .header__title Блок "Обо мне"
          iconed-button(
            type="iconed"
            v-if="emptyCatInShows === false"
            title="Добавить группу"
            @click="emptyCatInShows = true"
          )
        ul.app-skills
          li.app-skills__item(v-if="emptyCatInShows")
            category(
              empty
              @remove="emptyCatInShows = false"
              @approve="createCategory"
            )
          li.app-skills__item(
            v-for="section in categories"
            :key="section.id"
          )
            category(
              :title="section.category"
              :skills="section.skills"
              :categoryId="section.id"
              @create-skill="createSkill($event, section.id)"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
              @remove="removeCategory"
              @approve="editCategory($event, section.id)"
            )
        tags-adder(v-model="tags")
      .container(v-else)
        .loading-message ...loading
</template>

<script>
import button from "../../components/button";
import category from "../../components/category";
import tagsAdder from "../../components/tagsAdder";
import { mapActions, mapState  } from 'vuex';

export default {
  components: {
    iconedButton: button,
    category,
    tagsAdder
  },
  data() {
    return {
      emptyCatInShows: false,
      tags: "Html, Css, Vue, React"
    }
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.data
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      removeCategoryAction: "categories/remove",
      editCategoryAction: "categories/edit",
      fetchCategoryAction: "categories/fetch",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove",
      showTooltip: "tooltips/show"
    }),
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      };

      try {
        await this.addSkillAction(newSkill);

        this.showTooltip({
          text: `Добавление навыка - ${newSkill.title}`,
          type: "success"
        });
      } catch(error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }

      skill.title = "";
      skill.percent = "";
    },
    async removeSkill(skill) {
      try {
        await this.removeSkillAction(skill);
        this.showTooltip({
          text: `Удаление навыка - ${skill.title}`,
          type: "success"
        });
      } catch(error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }
    },
    async editSkill(skill) {
      try {
        await this.editSkillAction(skill);
        skill.editmode = false;

        this.showTooltip({
          text: `Изменение навыка - ${skill.title}`,
          type: "success"
        });
      } catch(error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }

    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCatInShows = false;

        this.showTooltip({
          text: `Создание категории - ${categoryTitle}`,
          type: "success"
        });

      } catch(error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }
    },
    async editCategory(categoryTitle, categoryId) {
      const category = {
        id: categoryId,
        title: categoryTitle
      };

      try {
        await this.editCategoryAction(category);

        this.showTooltip({
          text: `Изменение категории - ${categoryTitle}`,
          type: "success"
        });
      } catch(error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }
    },
    async removeCategory(categoryId) {
      try {
        await this.removeCategoryAction(categoryId);

        this.showTooltip({
          text: `Удаление категории`,
          type: "success"
        });
      } catch(error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }
    }
  },
  created() {
    try {
      this.fetchCategoryAction();
    } catch (error) {
      this.showTooltip({
        text: error.message,
        type: "error"
      });
    }
  }
}
</script>

<style lang="postcss" scoped src="./about.pcss"></style>
