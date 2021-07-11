<template lang="pug">
  .navigation-component
    .container
      nav.navigation
        ul.navigation__list
          li.navigation__item(v-for="link in links" :key="link.id" :class="{'navigation__item--active': link.active}")
            a.navigation__link(
              :href="link.link"
              @click="changeActiveLink(link)"
            ) {{link.title}}
</template>

<script>
const links = [
  {id: 0, title: "Обо мне", link: "./admin#/about", alias: "/about", active: false},
  {id: 1, title: "Работы", link: "./admin#/works", alias: "/works", active: false},
  {id: 2, title: "Отзывы", link: "./admin#/reviews", alias: "/reviews", active: false},
];

export default {

  data() {
    return {
      links
    }
  },
  created() {
    this.setActiveLink();
  },
  methods: {
    setActiveLink() {
      const currentPath = this.$router.currentRoute.path;
      links.forEach(link => {
        if(currentPath === link.alias)
          link.active = true;
      });
    },
    changeActiveLink(link) {
      links.forEach(link => {
        link.active = false;
      });

      link.active = true;
    }
  }
}
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>
