import Vue from "vue";

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
        created() {
            const data = require("../data/works.json");
            this.works = this.requireImagesToArray(data);
        },
        computed: {
            currentWork() {
                return this.works[0];
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
                this.currentIndex = currentItem.id - 1;

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
            requireImagesToArray(data) {
                return data.map(item => {
                    const requiredImage = require(`../images/content/slider/${item.picture}`).default;
                    item.picture = requiredImage;
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
