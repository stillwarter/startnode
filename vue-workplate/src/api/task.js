/**
 * 获取任务
 * https://www.cnblogs.com/hjk1124/p/15177240.html
 */
import request from "../tool/request";

/**
 * 获取当月当日的任务
 */
export function getTaskDay() {
  return request({
    url: "/mytask/geDaytask",
    method: "post",
  });
}

export function setTaskDay(data) {
  return request({
    url: "/mytask/seDaytask",
    method: "post",
    data,
  });
}
/**
 * 根据名字获取当月数据
 */
// export function getMyPlanCtx(data) {
//   return request({
//     url: "/myplan/getMyPlanCtx",
//     method: "post",
//     data
//   });
// }
