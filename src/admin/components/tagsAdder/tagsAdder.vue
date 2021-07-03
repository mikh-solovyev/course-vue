<template lang="pug">
  .tags-adder-component
    app-input(
      title="Добавление тега"
      v-model="currentTags"
      @input="$emit('change', currentTags)"
    )
    ul.tags
      li.tag(v-for="(tag, index) in tagsArray" :key="`${tag}${index}`" v-if="tag.trim()")
        tag(
          interactive
          :title="tag"
          @click="removeTag(tag)"
        )
</template>

<script>
import appInput from "../input";
import tag from "../tag";

export default {
  components: {
    appInput,
    tag
  },
  props: {
    tags: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "tags",
    event: "change"
  },
  data() {
    return {
      currentTags: this.tags
    }
  },
  computed: {
    tagsArray() {
      return this.currentTags.trim().split(",");
    }
  },
  methods: {
    removeTag(tag) {
      const tags = [...this.tagsArray];
      const tagIndex = tags.indexOf(tag);

      if(tagIndex < 0) return;
      tags.splice(tagIndex, 1);
      this.currentTags = tags.join(",");

      this.$emit('change', this.currentTags);
    }
  }
};
</script>

<style lang="postcss" scoped src="./tagsAdder.pcss"></style>
