import myLoading from '@/plugins/my-loading.js';
import { cancelArr } from '@/assets/js/axios-request.js'

const cancelRequest = function (cancelList) {
  let cancel;
  for (let i = 0; i < cancelList.length; i++) {
    cancel = cancelList[i];
    if (cancel) {
      cancel(i);
      cancelList.splice(i, 1);
      i--;
    }
  }
}

export default function (context) {
    // myLoading.show();
    cancelRequest(cancelArr);
}