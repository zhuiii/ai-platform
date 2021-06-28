import myLoading from '@/plugins/my-loading.js';

export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    myLoading.hide();
  })
}
