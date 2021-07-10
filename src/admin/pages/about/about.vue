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
              @create-skill="createSkill($event, section.id)"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
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
      fetchCategoryAction: "categories/fetch",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove",
    }),
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      };
      await this.addSkillAction(newSkill);

      skill.title = "";
      skill.percent = "";
    },
    removeSkill(skill) {
      this.removeSkillAction(skill);
    },
    async editSkill(skill) {
      await this.editSkillAction(skill);
      skill.editmode = false;
    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCatInShows = false;
      } catch(error) {
        console.log(error.message);
      }
    }
  },
  created() {
    this.fetchCategoryAction();
  }
}
</script>

<style lang="postcss" scoped src="./about.pcss"></style>
