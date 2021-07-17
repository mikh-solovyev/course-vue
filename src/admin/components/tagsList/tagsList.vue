<template lang="pug">
  ul.tags-list-component
    li.item(v-for="tag in tagsArray" :key="tag")
      tag(:title="tag")
</template>

<script>
import tag from "../tag";
export default {
  components: {tag},
  props: {
    tags: String
  },
  computed: {
    tagsArray() {
      return this.tags.split(",");
    }
  }
}
</script>

<style scoped lang="postcss" src="./tagList.pcss"></style>