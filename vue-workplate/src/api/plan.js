/**
 * 上传md编辑器的内容
 * https://www.cnblogs.com/hjk1124/p/15177240.html
 */
import request from "../tool/request";

/**
 * 获取当月的md名字
 */
export function getPlanList() {
  return request({
    url: "/myplan/readMyPlan",
    method: "post",
  });
}
/**
 * 根据名字获取当月数据
 */
export function getMyPlanCtx(data) {
  return request({
    url: "/myplan/getMyPlanCtx",
    method: "post",
    data
  });
}
