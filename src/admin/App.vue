<template lang="pug">
  .app-container
    headline(title="Панель администрирования")
      user
    navigation
    .page-content
      .container
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
            category(empty @remove="emptyCatInShows = false")
          li.app-skills__item(
            v-for="section in categories"
            :key="section.id"
          )
            category(
              :title="section.category"
              :skills="section.skills"
            )
</template>

<script>
  import headline from "./components/headline";
  import user from "./components/user";
  import navigation from "./components/navigation";
  import button from "./components/button";
  import category from "./components/category";

  export default {
    components: {
      headline,
      user,
      navigation,
      iconedButton: button,
      category
    },
    data() {
      return {
        categories: [],
        emptyCatInShows: false
      }
    },
    created() {
      this.categories = require("./data/category.json")
    }
  }
</script>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>


<style lang="postcss" scoped src="./app.pcss"></style>
