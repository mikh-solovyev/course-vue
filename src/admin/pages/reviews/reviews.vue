<template lang="pug">
  .reviews-page-component.page-component
    .page-content
      .container
        .header
          .header__title Блок "Отзывы"
        div.form(v-if="isEditorShow")
          app-form(
            type="reviews"
            :formTitle="formTitle"
            :editedReview="editedReview"
            @hideEditor="hideEditor"
            @changeReviews="changeReviews($event)"
          )
        ul.cards
          li.item(v-if="!isEditorShow")
            app-button(
              type="square"
              title="Добавить отзыв"
              @click="isEditorShow = true"
            )
          li.item(v-for="review in reviews" :key="review.id")
            review-card(
              @editReview="editReview($event)"
              @removeReview="removeReview($event)"
              :review="review"
            )
</template>

<script>
import appForm from "../../components/form";
import appButton from "../../components/button";
import reviewCard from "../../components/reviewCard";

import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isEditorShow: false,
      formTitle: "Добавление отзыва",
      editedReview: {},
    }
  },
  components: {appForm, appButton, reviewCard},
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchReviewsAction: "reviews/fetch",
      addReviewAction: "reviews/add",
      editReviewAction: "reviews/edit",
      removeReviewAction: "reviews/remove",
      showTooltip: "tooltips/show"
    }),
    hideEditor() {
      this.formTitle = "Добавление отзыва";
      this.isEditorShow = false;
    },
    async changeReviews(review) {

      if(review.id.length === 0) {
        try {
          await this.addReviewAction(review);

          this.showTooltip({
            text: `Добавление отзыва - ${review.author}`,
            type: "success"
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error"
          });
        }
      } else {
        try {
          await this.editReviewAction(review);

          this.showTooltip({
            text: `Редактирование отзыва - ${review.author}`,
            type: "success"
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error"
          });
        }
      }

      this.isEditorShow = false;
    },
    async removeReview(reviewId) {
      try {
        await this.removeReviewAction(reviewId);
        this.showTooltip({
          text: `Удаление отзыва id - ${reviewId}`,
          type: "success"
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }
    },
    editReview(review) {
      this.formTitle = "Редактирование отзыва"
      this.isEditorShow = true;
      review.preview = `https://webdev-api.loftschool.com/${review.photo}`
      this.editedReview = {...review};
    },
  },
  mounted() {
    this.fetchReviewsAction();
  }
}
</script>

<style scoped lang="postcss" src="./reviews.pcss"></style>
