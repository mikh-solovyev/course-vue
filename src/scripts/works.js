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
        props: ["works", "currentWork"],
        template: `#works-thumbs`,
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
        props: ["currentWork", "works", "currentIndex"],
        template: `#works-display`,
        components: {thumbs, btns},
        computed: {
            normalWorks() {
                const works = [...this.works];
                return works.slice(0, 4);
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
              currentIndex: 0
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
            slide(direction) {
                const lastItem = this.works[this.works.length - 1];
                switch (direction) {
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
            }
        }
    });
});
