import { Loading } from 'element-ui';
import Vue from 'vue'

let loadingInstance = null;

const myLoading = {
    show: () => {
        loadingInstance = Loading.service({ fullscreen: true, lock: true, background: 'rgba(30,182,254,0.5)' })
    },
    hide: () => {
        loadingInstance && loadingInstance.close();
    }
}

Vue.prototype.myLoading = myLoading;

export default myLoading;