import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

window.addEventListener("load", () => {

    const tags = {
        props: ["tags"],
        template: `#works-tags`
    };

    const thumbs = {
        props: ["works", "currentWork", "currentDirection"],
        template: `#works-thumbs`,
        methods: {
            enterCb(el, done) {
                const list = el.closest("ul");
                const elWidth = el.offsetWidth;
                const wrapperWidth = elWidth * 3;

                el.closest(".works-preview__thumbs").style.width = wrapperWidth + "px";
                list.classList.add("transition");

                if(this.currentDirection === "next") {
                    el.classList.add("outsider");
                    list.style.transform = `translateX(-${elWidth}px)`;
                } else {
                    el.classList.add("insider");
                    list.style.transform = `translateX(${elWidth}px)`;
                }

                list.addEventListener("transitionend", e => done());
            },

            afterCb(el) {
                const list = el.closest("ul");
                if(this.currentDirection === "next") {
                    el.classList.remove("outsider");
                } else {
                    el.classList.remove("insider");
                }

                list.classList.remove("transition");
                list.style.transform = "translateX(0px)";
            },
            leaveCb(el, done) {
                el.classList.add("fade");
                el.addEventListener("transitionend", e => done());
            }
        }
    };

    const btns = {
        template: `#works-btns`,
    };

    const info = {
        props: ["currentWork"],
        template: `#works-info`,
        components: {tags}
    };

    const display = {
        props: ["currentWork", "works", "currentIndex", "currentDirection"],
        template: `#works-display`,
        components: {thumbs, btns},
        computed: {
            normalWorks() {
                const works = [...this.works];
                return works.slice(0, 3);
            }
        }
    };

    new Vue({
        el: "#works-component",
        template: `#works-container`,
        components: {display, info},
        data() {
          return  {
              works: [],
              currentIndex: 0,
              currentDirection: "next"
          }
        },
        async created() {
            const {data} = await axios.get("/works/472");
            this.works = this.prepareData(data);
        },
        computed: {
            currentWork() {
                if(this.works[0]) {
                    return this.works[0];
                }

                return {};
            }
        },
        watch: {
            currentIndex(value) {
                this.makeLoop(value);
            }
        },
        methods: {
            change(index) {
                const currentItem = this.works[index];
                this.currentIndex = currentItem.index - 1;

                this.works.splice(index, 1);
                this.works.push(this.works[0]);
                this.works.shift();
                this.works.unshift(currentItem);
            },
            makeLoop(index) {
                const worksLength = this.works.length - 1;

                if(index < 0) {
                    this.currentIndex = worksLength;
                }

                if(index > worksLength) {
                    this.currentIndex = 0;
                }
            },
            prepareData(data) {
                return data.map((item, index) => {
                    item.index = index + 1;
                    item.photo = `https://webdev-api.loftschool.com/${item.photo}`;
                    item.techs = item.techs.split(",");
                    return item;
                });
            },
            slide(params) {
                if(timeOut)
                    clearTimeout(timeOut);

                params.target.closest(".square-btns").classList.add("disabled");

                this.currentDirection = params.direction;
                const lastItem = this.works[this.works.length - 1];
                switch (params.direction) {
                    case 'next': {
                        // Если не нужна цикличность
                        //if(this.works.length - 1 > this.currentIndex) {
                        this.works.push(this.works[0]);
                        this.works.shift();
                        this.currentIndex++;
                        //}
                        break;
                    }
                    case 'prev': {
                        //if(this.currentIndex > 0) {
                        this.works.unshift(lastItem);
                        this.works.pop();
                        this.currentIndex--;
                        //}
                        break;
                    }
                }

                let timeOut = setTimeout(() => {
                    params.target.closest(".square-btns").classList.remove("disabled");
                }, 1000);
            }
        }
    });
});
