import login from "../../pages/login";

export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_REVIEW(state, newReview) {
            state.data.push(newReview);
        },
        SET_REVIEWS(state, reviews) {
            state.data = reviews
        },
        EDIT_REVIEW(state, editReview) {
            state.data = state.data.map(review => {
                if (editReview.id === review.id) {
                    review = editReview;
                }

                return review;
            })
        },
        REMOVE_REVIEW(state, removeReviewId) {
            state.data = state.data.filter(review => {
                return removeReviewId !== review.id;
            })
        }
    },
    actions: {
        async add({ commit }, newReview) {
            const formData = new FormData();

            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            })

            try {
                const { data } = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
            } catch (error) {
                throw new Error("Ошибка добавления отзыва");
            }
        },
        async edit({commit}, editReview) {

            const formData = new FormData();

            Object.keys(editReview).forEach(item => {
                formData.append(item, editReview[item]);
            });

            try {
                const { data } = await this.$axios.post(`/reviews/${editReview.id}`, formData);
                commit("EDIT_REVIEW", data.review);
            } catch (error) {
                throw new Error("Ошибка редактирования отзыва");
            }
        },
        async remove({commit}, removeReviewId) {
            try {
                const { data } = await this.$axios.delete(`/reviews/${removeReviewId}`);
                commit("REMOVE_REVIEW", removeReviewId);
            } catch (error) {
                throw new Error("Ошибка удаления отзыва");
            }
        },
        async fetch({commit}) {
            try {
                const { data } = await this.$axios.get("/reviews/472");
                commit("SET_REVIEWS", data);
            } catch (error) {
                throw new Error("Ошибка получения отзывов");
            }
        }
    },
};