<template lang="pug">
  card(simple)
    .reviews-wrapper
      .data
        .data-row
          .data-col.data-col--avatar
            avatar(:src="cover" :size="4")
          .data-col
            .title {{review.author}}
            .position {{review.occ}}
        .text
          p {{review.text}}
        .btns
          icon(
            @click="$emit('editReview', review)"
            symbol="pencil"
            title="Править"
          )
          icon(
            @click="$emit('removeReview', review.id)"
            symbol="trash"
            title="Удалить"
          )
</template>

<script>
import avatar from "../avatar";
import card from "../card";
import icon from "../icon";

export default {
  components: { card, icon, avatar },
  props: {
    review: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    }
  },
};
</script>

<style lang="postcss" scoped src="./reviewCard.pcss"></style>