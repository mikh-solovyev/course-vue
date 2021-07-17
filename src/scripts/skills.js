import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

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
        async created() {
            const {data} = await axios.get("/categories/472");
            this.skills = data;
        }
    });
});

