
import routerPath from '@/assets/js/routerPath.js'
import {
    setStorage,
    getStorage,
} from "@/assets/js/utils.js";

export default function ({ query, redirect, store }) {
    /* if (process.client) {
        const { i, lc, bc } = query;
        const ai = getStorage('ai');
        if (ai) {
            const { i, lc, bc } = JSON.parse(ai);
            store.commit('setAiId', i);
            store.commit('setLikeCount', lc);
            store.commit('setDislikeCount', bc);
            return;
        }
        if (i) {
            store.commit('setAiId', i);
            store.commit('setLikeCount', lc);
            store.commit('setDislikeCount', bc);
            setStorage('ai', { i, lc, bc });
            return;
        }
        redirect(routerPath.home_ai);
    } */
}