<template lang="pug">
  card(slim)
    edit-line(
      slot="title"
      v-model="categoryTitle"
      :editModelByDefault="empty"
      :categoryId="categoryId"
      @remove="$emit('remove', $event)"
      @approve="$emit('approve', $event)"
    )
    template(slot="content")
      ul.skills(slot="content" v-if="empty === false")
        li.skills__item(v-for="skill in skills" :key="skill.id")
          skill(
            :skill="skill"
            @remove="$emit('remove-skill', $event)"
            @approve="$emit('edit-skill', $event)"
          )
      .skills__bottom-line
        skill-add-line(
          :blocked="empty"
          @approve="$emit('create-skill', $event)"
        )

</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAddLine from "../skillAddLine";

export default {
  props: {
    empty: {
      type: Boolean
    },
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => []
    },
    categoryId: Number
  },
  components: {
    card, editLine, skill, skillAddLine
  },
  data() {
    return {
      categoryTitle: this.title,
    }
  }
}
</script>

<style lang="postcss" scoped src="./category.pcss"></style>
