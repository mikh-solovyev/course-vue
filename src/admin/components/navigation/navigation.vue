<template lang="pug">
  .navigation-component
    .container
      nav.navigation
        ul.navigation__list
          li.navigation__item(v-for="link in links" :key="link.id" :class="{'navigation__item--active': link.active}")
            a.navigation__link(:href="link.alias") {{link.title}}
</template>

<script>
const links = [
  {id: 0, title: "Обо мне", alias: "about", active: false},
  {id: 1, title: "Работы", alias: "works", active: true},
  {id: 2, title: "Отзывы", alias: "reviews", active: false},
];
export default {

  data() {
    return {
      links
    }
  },
}
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>
