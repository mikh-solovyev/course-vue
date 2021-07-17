<template lang="pug">
  card(simple)
    .works-wrapper
      .pic
        img(class="image" :src="cover")
        .tag
          tags-list(:tags="work.techs")
      .data
        .title {{work.title}}
        .text
          p {{work.description}}
        a(:href="work.link" class="link") {{work.link}}
        .btns
          icon(
            @click="$emit('editWork', work)"
            symbol="pencil"
            title="Править"
          )
          icon(
            @click="$emit('removeWork', work.id)"
            symbol="trash"
            title="Удалить"
          )
</template>

<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";

export default {
  components: { card, icon, tagsList },
  props: {
    work: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`
    }
  },
};
</script>

<style lang="postcss" scoped src="./workCard.pcss"></style>