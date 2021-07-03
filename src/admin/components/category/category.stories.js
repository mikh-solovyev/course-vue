import category from "./category.vue";
import {action} from "@storybook/addon-actions";

export default {
    title: "category",
    components: {category}
};

const methods = {
    onRemove: action("onRemove"),
    onRemoveSkill: action("onRemoveSkill"),
    onEditSkill: action("onEditSkill"),
};

const skills = [
    {id: 0, title: "CSS", percent: 80},
    {id: 1, title: "HTML", percent: 20},
    {id: 2, title: "GIT", percent: 10},
];

export const defaultView = () => ({
    components: {category},
    data() {
        return {
            title: "Frontend",
            skills
        }
    },
    template: `
      <category 
          :title="title" 
          :skills="skills" 
          @remove="onRemove"
          @remove-skill="onRemoveSkill"
          @edit-skill="onEditSkill"
      />
    `,
    methods
});

defaultView.story = {
    name: "Стандартный вид",
};
