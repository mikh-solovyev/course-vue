import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

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
            prepareData(data) {
                return data.map(item => {
                    item.photo = `https://webdev-api.loftschool.com/${item.photo}`;
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
        async created() {
            const {data} = await axios.get("/reviews/472");
            this.reviews = this.prepareData(data);
        }
    });
});
