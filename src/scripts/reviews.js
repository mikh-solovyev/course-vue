import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

window.addEventListener("load", () => {
    new Vue({
        el: "#slider-component",
        template: `#slider-container`,
        components: {
            Swiper, SwiperSlide
        },
        data() {
            return {
                reviews: [],
                isStart: true,
                isFinish: false,
                sliderOptions: {
                    slidesPerView: 2,
                    spaceBetween: 100,
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 50
                        },
                        // when window width is >= 480px
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 100
                        },
                    }
                }
            }
        },
        methods: {
            requireImagesToArray(data) {
                return data.map(item => {
                    const requiredImage = require(`../images/content/reviews/${item.picture}`).default;
                    item.picture = requiredImage;
                    return item;
                });
            },
            slide(direction) {
                const slider = this.$refs["slider"].$swiper;

                switch(direction) {
                    case "next": {
                        slider.slideNext();
                        break;
                    }

                    case "prev": {
                        slider.slidePrev();
                        break;
                    }
                }

                this.isStart = slider.isBeginning;
                this.isFinish = slider.isEnd;
            }
        },
        created() {
            const data = require("../data/reviews.json");
            this.reviews = this.requireImagesToArray(data);
        }
    });
});
