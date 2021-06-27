import Vue from "vue";

window.addEventListener("load",  () => {

    const skillsItem = {
        props: ["skill"],
        template: `#skills-item`,
        methods: {
            drawPercentInCircle() {
                const circle = this.$refs["colored-circle"];
                const dashArray = parseInt(
                    getComputedStyle(circle).getPropertyValue("stroke-dasharray")
                );

                circle.style.strokeDashoffset = (dashArray / 100) * (100 - this.skill.percent);
            }
        },
        mounted() {
            this.drawPercentInCircle();
        }
    }

    const skillsRow = {
        props: ["section"],
        template: `#skills-row`,
        components: {
            skillsItem
        }
    }

    new Vue({
        el: `#skills-component`,
        template: `#skills-list`,
        components: {
            skillsRow
        },
        data() {
           return {
               skills: []
           }
        },
        created() {
            this.skillsData = require("../data/skills.json");
        }
    });
});

