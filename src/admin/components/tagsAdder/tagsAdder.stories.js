import tagsAdder from "./tagsAdder.vue";

export default {
    title: "tagsAdder",
    components: {tagsAdder}
}

export const defaultView = () => ({
    components: { tagsAdder },
    data() {
        return {
            tags: "One, Two, Three, Four"
        }
    },
    template: `
      <tags-adder v-model="tags"/>
    `
});

defaultView.story = {
    name: "Стандартный вид",
};
