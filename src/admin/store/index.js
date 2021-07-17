import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import categories from "./modules/categories";
import skills from "./modules/skills";
import tooltips from "./modules/tooltips";
import user from "./modules/user";
import works from "./modules/works";
import reviews from "./modules/reviews";

export default new Vuex.Store({
    modules: { categories, skills, tooltips, user, works, reviews }
});
