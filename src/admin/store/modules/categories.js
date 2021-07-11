import $axios from "../../requests";
import category from "../../components/category";

export default {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY: (state, category) => state.data.unshift(category),
        REMOVE_CATEGORY: (state, categoryId) => {
            state.data = state.data.filter(category => {
                return category.id !== categoryId;
            });
        },
        EDIT_CATEGORY: (state, editCategory) => {
            state.data = state.data.map(category => {
                if(editCategory.id === category.id) {
                    category.category = editCategory.title;
                }
                return category;
            });
        },
        ADD_SKILL: (state, newSkill) => {
            state.data = state.data.map(category => {
               if(category.id === newSkill.category) {
                   category.skills.push(newSkill);
               }

               return category;
            });
        },
        REMOVE_SKILL: (state, skillToRemove) => {
            state.data = state.data.map(category => {
                if(category.id === skillToRemove.category) {
                    category.skills = category.skills.filter(skill => {
                        return skill.id !== skillToRemove.id;
                    });
                }

                return category;
            });
        },
        EDIT_SKILL: (state, skillToEdit) => {
            const editSkillInCategory = category => {
                category.skills = category.skills.map(skill => {
                    return skill.id === skillToEdit.id ? skillToEdit : skill;
                });
            };

            const findCategory = category => {
              if(category.id === skillToEdit.category) {
                editSkillInCategory(category);
              }

              return category;
            };

            state.data = state.data.map(findCategory);
        }
    },
    actions: {
        async create({commit}, title) {
            try {
                const { data } = await $axios.post("/categories", { title });
                commit("ADD_CATEGORY", data);
            } catch(error) {
                throw new Error("Ошибка");
            }
        },
        async remove({commit}, categoryId) {
            try {
                const { data } = await $axios.delete(`/categories/${categoryId}`);
                commit("REMOVE_CATEGORY", categoryId);
            } catch(error) {
                throw new Error("Ошибка");
            }
        },
        async edit({commit}, category) {
            try {
                const { data } = await $axios.post(`/categories/${category.id}`, { title: category.title });
                commit("EDIT_CATEGORY", category);
            } catch(error) {
                throw new Error("Ошибка");
            }
        },
        async fetch({commit}) {
            try {
                const { data } = await $axios.get("/categories/472");
                commit("SET_CATEGORIES", data);
            } catch(error) {
                throw new Error(error);
            }
        }
    }
}
