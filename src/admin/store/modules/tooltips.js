export default {
    namespaced: true,
    state: {
        isShows: false,
        text: "",
        type: "success"
    },
    actions: {
        show({commit, dispatch}, tooltip) {
            let timeout = null;

            commit("SET_TOOLTIP", {
                isShows: true,
                text: tooltip.text,
                type: tooltip.type,
            });

            if(timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                dispatch("hide");
            }, 3000);
        },
        hide({commit, state}) {
            commit("SET_TOOLTIP", {
                ...state,
                isShows: false,
            });
        }
    },
    mutations: {
        SET_TOOLTIP: (state, tooltip) => {
            state.isShows = tooltip.isShows;
            state.text = tooltip.text;
            state.type = tooltip.type;
        }
    }
}
