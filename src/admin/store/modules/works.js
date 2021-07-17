export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_WORK(state, newWork) {
            state.data.push(newWork);
        },
        SET_WORKS(state, works) {
            state.data = works
        },
        EDIT_WORK(state, editWork) {
            state.data = state.data.map(work => {
                if (editWork.id === work.id) {
                    work = editWork;
                }

                return work;
            })
        },
        REMOVE_WORK(state, removeWorkId) {
            state.data = state.data.filter(work => {
                return removeWorkId !== work.id;
            })
        }
    },
    actions: {
        async add({ commit }, newWork) {
            const formData = new FormData();

            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })

            try {
                const { data } = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            } catch (error) {
                throw new Error("Ошибка добавления работы");
            }
        },
        async edit({commit}, editWork) {

            const formData = new FormData();

            Object.keys(editWork).forEach(item => {
                formData.append(item, editWork[item]);
            });

            try {
                const { data } = await this.$axios.post(`/works/${editWork.id}`, formData);
                commit("EDIT_WORK", data.work);
            } catch (error) {
                throw new Error("Ошибка редактирования работы");
            }
        },
        async remove({commit}, removeWorkId) {
            try {
                const { data } = await this.$axios.delete(`/works/${removeWorkId}`);
                commit("REMOVE_WORK", removeWorkId);
            } catch (error) {
                throw new Error("Ошибка удаления работы");
            }
        },
        async fetch({commit}) {
            try {
                const { data } = await this.$axios.get("/works/472");
                commit("SET_WORKS", data);
            } catch (error) {
                throw new Error("Ошибка получения работ");
            }
        }
    },
};