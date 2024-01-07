import { useRouter } from "vue-router";
const router = useRouter();
/**
 * 路由跳转
 */
export function routerTo(path) {
  console.log(router);
  // router.push(path);
}
